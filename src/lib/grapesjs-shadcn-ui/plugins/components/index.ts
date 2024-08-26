import { Editor } from "grapesjs";

/**
 * @param editor
 *
 * Category: Components
 *
 * Items:
 *   - Button
 *   - Link
 *   - Menu
 *   - Table
 *   - Card
 *   - Progress
 *   - BG Image
 */

export const componentsPlugin = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  // Button
  blockManager.add("components-button", {
    label: "Button",
    content:
      "<button class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>Button</button>",
    category: "Components",
    attributes: {
      title: "Insert button",
    },
    media:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clip-rule="evenodd"></path></svg>',
  });

  // Link
  blockManager.add("components-link", {
    label: "Link",
    content:
      "<a class='inline-flex text-base underline cursor-pointer font-medium transition-colors text-slate-800 hover:text-slate-700'>Link</a>",
    category: "Components",
    attributes: {
      title: "Insert link",
      href: "#",
    },
    media: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path></svg>`,
  });

  // Card
  blockManager.add("components-menu", {
    label: "Menu",
    content: `<nav class="bg-slate-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white text-2xl font-bold">
                <a href="#">Brand</a>
            </div>
            <ul class="flex space-x-4">
                <li><a href="#" class="text-slate-300 hover:text-white">Home</a></li>
                <li><a href="#" class="text-slate-300 hover:text-white">About</a></li>
                <li><a href="#" class="text-slate-300 hover:text-white">Services</a></li>
                <li><a href="#" class="text-slate-300 hover:text-white">Contact</a></li>
            </ul>
            <div>
                <a href="#" class="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700">Login</a>
            </div>
        </div>
    </nav>`,
    category: "Components",
    media: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="Menu_Burger"><path d="M3.563,4.063c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001Z"></path><path d="M3.563,12.501c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002Z"></path><path d="M3.563,20.939c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002Z"></path></g></svg>`,
  });

  // Table
  blockManager.add("components-table", {
    label: "Table",
    content: `<table class="min-w-full bg-white rounded-lg shadow-lg">
                <thead class="bg-slate-800 text-white">
                    <tr>
                        <th class="py-3 px-6 text-left">#</th>
                        <th class="py-3 px-6 text-left">Name</th>
                        <th class="py-3 px-6 text-left">Email</th>
                        <th class="py-3 px-6 text-left">Role</th>
                        <th class="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr class="bg-gray-50 hover:bg-gray-100">
                        <td class="py-3 px-6">1</td>
                        <td class="py-3 px-6">John Doe</td>
                        <td class="py-3 px-6">john@example.com</td>
                        <td class="py-3 px-6">Admin</td>
                        <td class="py-3 px-6">
                            <button class="bg-slate-500 text-white py-1 px-3 rounded hover:bg-slate-600">Edit</button>
                            <button class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-100">
                        <td class="py-3 px-6">2</td>
                        <td class="py-3 px-6">Jane Smith</td>
                        <td class="py-3 px-6">jane@example.com</td>
                        <td class="py-3 px-6">User</td>
                        <td class="py-3 px-6">
                            <button class="bg-slate-500 text-white py-1 px-3 rounded hover:bg-slate-600">Edit</button>
                            <button class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                    <tr class="bg-gray-50 hover:bg-gray-100">
                        <td class="py-3 px-6">3</td>
                        <td class="py-3 px-6">Mark Johnson</td>
                        <td class="py-3 px-6">mark@example.com</td>
                        <td class="py-3 px-6">Editor</td>
                        <td class="py-3 px-6">
                            <button class="bg-slate-500 text-white py-1 px-3 rounded hover:bg-slate-600">Edit</button>
                            <button class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>`,
    category: "Components",
    media: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z"></path></svg>`,
  });

  // Card
  blockManager.add("components-card", {
    label: "Card",
    content: `<div class="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="bg-slate-800 text-white text-center py-4">
            <h2 class="text-3xl font-semibold">Pro Plan</h2>
            <p class="mt-2 text-lg">$49<span class="text-sm">/mo</span></p>
        </div>
        <div class="p-6">
            <ul class="space-y-4">
                <li class="flex items-center">
                    <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    Unlimited Access
                </li>
                <li class="flex items-center">
                    <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    24/7 Support
                </li>
                <li class="flex items-center">
                    <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    Free Updates
                </li>
                <li class="flex items-center">
                    <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    Access to Premium Features
                </li>
            </ul>
            <button class="mt-8 w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700">
                Get Started
            </button>
        </div>
    </div>`,
    category: "Components",
    media: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"></path></svg>`,
  });

  // Progress
  blockManager.add("components-progress", {
    label: "Progress",
    content: `<div class="w-full max-w-lg">
        <div class="bg-gray-300 rounded-full h-4 overflow-hidden">
            <div class="bg-slate-600 h-full rounded-full" style="width: 75%;"></div>
        </div>
        <p class="text-right mt-2 text-slate-700">75% Complete</p>
    </div>`,
    category: "Components",
    media: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 160H320V128H448v32zM48 64C21.5 64 0 85.5 0 112v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM448 352v32H192V352H448zM48 288c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48H48z"></path></svg>`,
  });

  // Bg Image
  blockManager.add("components-bg-image", {
    label: "Bg Image",
    content: `<div class="relative h-fit w-full py-8">
      <img
        src="https://dummyimage.com/1280x720"
        alt="Background Image"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-slate-950/65"
      ></div>
      <div class="relative z-10 flex items-center justify-center h-full">
        <div>
          <h1 class="text-white text-4xl font-bold">Overlay Text</h1>
        </div>
      </div>
    </div>`,
    category: "Components",
    media: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="Image_Off"><path d="M19.937,14.218l0,-8.654c0,-0.829 -0.672,-1.5 -1.5,-1.5l-10.628,-0c-0.276,-0 -0.5,-0.225 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5l10.628,-0c1.38,-0 2.5,1.118 2.5,2.5l0,10.624c0,0.276 -0.224,0.5 -0.5,0.501c-0.276,-0 -0.5,-0.225 -0.5,-0.5l0,-0.556l-4.583,-4.584c-0.456,-0.456 0.251,-1.163 0.707,-0.707c0.162,0.162 2.37,2.37 3.876,3.876Zm-0.121,6.304c-0.395,0.262 -0.869,0.415 -1.379,0.415l-12.874,-0c-1.381,-0 -2.5,-1.119 -2.5,-2.5l0,-12.873c0,-0.51 0.153,-0.984 0.414,-1.38l-0.263,-0.263c-0.456,-0.456 0.251,-1.163 0.707,-0.707c0.088,0.088 0.176,0.176 0.263,0.263c0.245,0.245 16.095,16.094 16.339,16.338l0.263,0.263c0.455,0.456 -0.252,1.163 -0.707,0.707c-0.088,-0.087 -0.175,-0.175 -0.263,-0.263Zm-11.104,-11.103l-2.001,-2.001c-0.094,0.196 -0.146,0.415 -0.146,0.647c-0,0.829 0.672,1.5 1.5,1.5c0.232,-0 0.451,-0.052 0.647,-0.146Zm-2.733,-2.733l-1.77,-1.77c-0.093,0.196 -0.146,0.416 -0.146,0.648l0,10.717l1.926,-1.926c0.587,-0.586 1.536,-0.586 2.122,-0l0.555,0.554c0.195,0.196 0.511,0.196 0.706,0l2.415,-2.415l-2.343,-2.343c-0.395,0.262 -0.869,0.414 -1.379,0.414c-1.38,-0 -2.5,-1.119 -2.5,-2.5c-0,-0.509 0.152,-0.983 0.414,-1.379Zm-1.916,11.009l0,0.741c0,0.829 0.671,1.5 1.5,1.5l12.874,0c0.232,0 0.451,-0.052 0.647,-0.145c-0.165,-0.165 -3.264,-3.263 -6.59,-6.59l-2.414,2.415c-0.585,0.586 -1.537,0.586 -2.122,0l-0.554,-0.554c-0.195,-0.196 -0.512,-0.196 -0.708,0l-2.633,2.633Z"></path></g></svg>`,
  });
};
