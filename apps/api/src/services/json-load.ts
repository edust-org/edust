import jsonFile from "jsonfile"
import path from "path"

class JsonLoadService {
  async load(filePath: string): Promise<any> {
    try {
      const absolutePath = path.resolve(filePath)
      return await jsonFile.readFile(absolutePath)
    } catch (error) {
      console.error(`Error loading JSON file: ${filePath}`, error)
      throw error
    }
  }
}

export const jsonLoad = new JsonLoadService()
