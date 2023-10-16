/* tslint:disable */
/* eslint-disable */
/**
 * AssistedInstall
 * Assisted installation
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface PresignedUrl
 */
export interface PresignedUrl {
  /**
   * Pre-signed URL for downloading the infra-env discovery image.
   * @type {string}
   * @memberof PresignedUrl
   */
  url: string;
  /**
   * Expiration time for the URL token.
   * @type {string}
   * @memberof PresignedUrl
   */
  expires_at?: string;
}