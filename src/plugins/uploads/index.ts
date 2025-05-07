import path from "path"
import express from "express"

const UploadsPlugin = {
  load: (container: any) => {
    const app = container.resolve("express")
    const uploadsDir = path.resolve(__dirname, "../../uploads")
    app.use("/uploads", express.static(uploadsDir))
  },
}

export default UploadsPlugin

// "build": "medusa build",