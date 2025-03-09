# Edust-GrapesJS: Drag & Drop Page Builder for Edust

Edust-GrapesJS is a custom extension of GrapesJS, designed specifically for Edust to create and manage educational pages with a drag-and-drop interface. It offers tailored components, improved styling options, and enhanced features to make page building seamless for schools, teachers, and institutions.

# How to use this in Edust?

1. Install in you project and include the component.

```json
"@edust/grapesjs": "workspace:*"
```

Parent component `index.tsx` or p`age.tsx`

```tsx
import EdustGrapesjs, { ContextProviders } from "@edust/grapesjs"

;<ContextProviders
  pageOptions={{
    addANewPage: async () => true,
    deletePage: async () => true,
    editPageName: async () => true,
  }}
>
  <EdustGrapesjs optionsCustomize={async () => {}} configs={{}} />
</ContextProviders>
```
