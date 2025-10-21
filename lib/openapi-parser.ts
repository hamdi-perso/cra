import yaml from 'js-yaml';
import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

export type OpenAPIDocument = OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

export interface ParseResult {
  success: boolean;
  data?: OpenAPIDocument;
  error?: string;
  details?: {
    version?: string;
    title?: string;
    description?: string;
    format?: 'json' | 'yaml';
  };
}

interface UnknownObject {
  [key: string]: unknown;
}

export interface OpenAPIInfo {
  version: string;
  title: string;
  description: string;
  baseUrl: string;
  endpoints: number;
  tags: string[];
  securitySchemes: string[];
}

interface TagObject {
  name: string;
  description?: string;
}

/**
 * Parse et valide un fichier OpenAPI/Swagger (JSON ou YAML)
 */
export async function parseOpenAPIFile(file: File): Promise<ParseResult> {
  try {
    // Lire le contenu du fichier
    const content = await file.text();
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    let parsedContent: UnknownObject;
    let format: 'json' | 'yaml' = 'json';

    // Parser selon le format
    if (fileExtension === 'yaml' || fileExtension === 'yml') {
      try {
        parsedContent = yaml.load(content) as UnknownObject;
        format = 'yaml';
      } catch {
        return {
          success: false,
          error: 'Erreur de parsing YAML',
          details: { format: 'yaml' }
        };
      }
    } else {
      try {
        parsedContent = JSON.parse(content) as UnknownObject;
        format = 'json';
      } catch (jsonError) {
        const errorMessage = jsonError instanceof Error ? jsonError.message : 'Erreur inconnue';
        return {
          success: false,
          error: 'Erreur de parsing JSON: ' + errorMessage,
          details: { format: 'json' }
        };
      }
    }

    // Check if it's a valid OpenAPI/Swagger file
    if (!('openapi' in parsedContent) && !('swagger' in parsedContent)) {
      return {
        success: false,
        error: 'Le fichier ne contient pas de spécification OpenAPI/Swagger valide',
        details: { format }
      };
    }

    // Valider avec swagger-parser
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validated = await SwaggerParser.validate(parsedContent as any) as unknown as OpenAPIDocument;
      
      // Extraire la version selon le type de document
      const version = 'openapi' in validated 
        ? validated.openapi 
        : 'swagger' in validated 
          ? validated.swagger 
          : 'unknown';
      
      return {
        success: true,
        data: validated,
        details: {
          version,
          title: validated.info?.title,
          description: validated.info?.description,
          format
        }
      };
    } catch (validationError) {
      const errorMessage = validationError instanceof Error ? validationError.message : 'Erreur de validation';
      const version = typeof parsedContent.openapi === 'string' 
        ? parsedContent.openapi 
        : typeof parsedContent.swagger === 'string'
          ? parsedContent.swagger
          : 'unknown';
      
      return {
        success: false,
        error: 'Erreur de validation OpenAPI: ' + errorMessage,
        details: {
          version,
          format
        }
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return {
      success: false,
      error: 'Erreur lors de la lecture du fichier: ' + errorMessage
    };
  }
}

/**
 * Extrait les informations principales d'une spec OpenAPI
 */
export function extractOpenAPIInfo(spec: OpenAPIDocument): OpenAPIInfo {
  const version = 'openapi' in spec ? spec.openapi : 'swagger' in spec ? spec.swagger : 'unknown';
  
  // Handle tags according to version
  const tags: string[] = [];
  if ('tags' in spec && Array.isArray(spec.tags)) {
    tags.push(...spec.tags.map((tag: TagObject) => tag.name));
  }
  
  // Handle base URL according to version
  let baseUrl = '';
  if ('servers' in spec && Array.isArray(spec.servers) && spec.servers.length > 0) {
    baseUrl = spec.servers[0].url || '';
  } else if ('basePath' in spec && typeof spec.basePath === 'string') {
    baseUrl = spec.basePath;
  }
  
  // Handle security schemes according to version
  const securitySchemes: string[] = [];
  if ('components' in spec && spec.components?.securitySchemes) {
    securitySchemes.push(...Object.keys(spec.components.securitySchemes));
  } else if ('securityDefinitions' in spec && spec.securityDefinitions) {
    securitySchemes.push(...Object.keys(spec.securityDefinitions));
  }
  
  return {
    version,
    title: spec.info?.title || 'Sans titre',
    description: spec.info?.description || '',
    baseUrl,
    endpoints: Object.keys(spec.paths || {}).length,
    tags,
    securitySchemes
  };
}
