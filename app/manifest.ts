import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "chandra laundry",
    short_name: "laundry",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
