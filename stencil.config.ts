import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
// import { reactOutputTarget } from "@stencil/react-output-target";

// export const prefix = "meow";
// cropperjs/dist/cropper.css
export const config: Config = {
  namespace: "saki-ui",
  buildEs5: true,
  devServer: {
    reloadStrategy: "pageReload",
    port: 32300,
    // https: {
    //   cert: readFileSync('cert.pem', 'utf8'),
    //   key: readFileSync('key.pem', 'utf8')
    // }
  },
  // globalStyle: "node_modules/cropperjs/dist/cropper.css",
  plugins: [
    sass({
      injectGlobalPaths: [
        // "src/assets/iconfont/iconfont.css",
        // "src/globals/variables.scss",
        "src/globals/base.scss",
        // quill.bubble.css quill.core.css quill.snow.css
        "node_modules/quill/dist/quill.core.css",
        "node_modules/quill/dist/quill.snow.css",
        "node_modules/quill/dist/quill.bubble.css",
        "src/components/Avatar/cropper.scss",
      ],
    }),
  ],
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    // reactOutputTarget({
    //   componentCorePackage: 'component-library',
    //   proxiesFile: './component-library-react/src/components.ts',
    //   includeDefineCustomElements: true,
    // }),
    { type: "dist-hydrate-script" },
    {
      type: "dist-custom-elements-bundle",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
};
