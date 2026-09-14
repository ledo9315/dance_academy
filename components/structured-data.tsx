type StructuredDataProps = {
  /** A schema.org object or `@graph` document. */
  data: Record<string, unknown>;
};

/**
 * Renders JSON-LD. The payload is built on the server from static data, never
 * from user input, so serialising it into the script tag is safe.
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
