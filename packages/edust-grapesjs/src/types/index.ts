import type { Editor } from "grapesjs"

export enum ActivePanel {
  "SELECTORS" = "SELECTORS",
  "TRAITS" = "TRAITS",
  "BLOCKS" = "BLOCKS",
}

/**
 * Configuration interface for handling save, load project data, and load assets operations.
 *
 * @interface Configs
 */
export interface Configs {
  handleStore: (assets: object, page: object) => Promise<void>

  /**
   * Function to handle saving the editor's content or state.
   *
   * @param {Editor} editor - The editor instance to save.
   * @returns {Promise<void>} A promise that resolves when the save operation is complete.
   */
  handleSave: (editor: Editor) => Promise<void>

  /**
   * Function to load the project data.
   *
   * @returns {Promise<object>} A promise that resolves to an object containing the project data.
   */
  handleLoadProjectData: () => Promise<object>

  /**
   * Function to load the assets for the project.
   * It's project images
   *
   * @returns {Promise<object>} A promise that resolves to an object containing the assets data.
   */
  handleLoadAssetImages: () => Promise<[]>

  handleRemoveAssetImage: (id: string) => Promise<void>
}
