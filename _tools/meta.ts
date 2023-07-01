import {
  BuildOptions,
  EntryPoint,
} from "https://deno.land/x/dnt@0.37.0/mod.ts";
import { expandGlobSync } from "https://deno.land/std@0.190.0/fs/expand_glob.ts";
import {
  fromFileUrl,
  join,
  parse,
  relative,
} from "https://deno.land/std@0.190.0/path/mod.ts";

interface ModuleInfo {
  readonly name: string;
  readonly path: string;
}

function path2EntryPoint(module: ModuleInfo): EntryPoint {
  const entryPoint: EntryPoint = {
    name: toRelative(module.name),
    path: toRelative(module.path),
  };

  return entryPoint;
}

function module2TypeVersions(modules: readonly ModuleInfo[]) {
  const entries = modules.map(({ name, path }) => {
    return [name, [join("types", toDts(path))]];
  });
  const map = Object.fromEntries(entries);

  return { "*": map };
}

function toRelative(path: string): string {
  return path.startsWith("./") ? path : "./" + path;
}

function toDts(path: string): string {
  return path.replace(/.ts$/, ".d.ts");
}

export const makeOptions = (version: string): BuildOptions => {
  const root = fromFileUrl(import.meta.resolve("../"));
  const entries = expandGlobSync("!(_*|*_test.ts|*_bench*)*.ts", {
    includeDirs: false,
    root,
  });

  const modules = [...entries].map(({ path }) => relative(root, path)).map(
    (path) => {
      const parsed = parse(path);
      const name = join(parsed.dir, parsed.name) + ".js";

      return { name, path };
    },
  );

  const entryPoints = modules.map(path2EntryPoint);
  const typesVersions = module2TypeVersions(modules);

  console.log(entryPoints);

  return {
    test: false,
    shims: {},
    typeCheck: "both",
    entryPoints,
    compilerOptions: { lib: ["ESNext"] },
    outDir: "./npm",
    package: {
      name: "@miyauci/seqtools",
      version,
      description: "Efficient utilities for sequence",
      keywords: [
        "sequence",
        "utilities",
        "indexable",
        "slice",
        "sliceable",
        "at",
        "tools",
      ],
      license: "MIT",
      homepage: "https://github.com/TomokiMiyauci/seqtools",
      repository: {
        type: "git",
        url: "git+https://github.com/TomokiMiyauci/seqtools.git",
      },
      bugs: {
        url: "https://github.com/TomokiMiyauci/seqtools/issues",
      },
      sideEffects: false,
      type: "module",
      publishConfig: { access: "public" },
      typesVersions,
      main: undefined,
      module: undefined,
      types: undefined,
    },
    packageManager: "pnpm",
  };
};
