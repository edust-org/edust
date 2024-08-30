import { PagesResultProps, useEditor } from "@grapesjs/react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function CustomPageManager({
  pages,
  selected,
  add,
  select,
  remove,
}: PagesResultProps) {
  const editor = useEditor();

  const addNewPage = () => {
    const pn = prompt("What is your page name?");

    if (!pn) {
      return alert("Please give me your page name.");
    }
    const pageName = pn?.toLocaleLowerCase();

    const pg = editor.Pages;
    const pgs = pg.getAll().map((p) => {
      return p?.attributes?.name?.toLowerCase();
    });

    if (pgs.includes(pageName)) {
      return alert("Already page name exist.");
    }

    add({
      name: pageName,
      component: `<h1>Page content ${pageName}</h1>`,
    });

    editor.store((data: any) => ({ site_data: JSON.stringify(data) }));
  };

  const handleEdit = (page) => {
    // Log the current page data (including its name)
    console.log("Page before update:", page);

    // Update the page name
    const newName = prompt("Enter the new page name:", page.get("name"));

    // If the user provided a new name, update the page
    if (newName && newName.trim()) {
      page.set("name", newName);
    }
  };

  return (
    <div className="gjs-custom-page-manager">
      <div className="p-2">
        <button
          type="button"
          className={"w-full rounded border px-2 py-1"}
          onClick={addNewPage}
        >
          Add new page
        </button>
      </div>
      {pages.map((page, index) => (
        <div
          key={page.getId()}
          className={`flex items-center border-b border-slate-500 px-4 py-2 ${
            index === 0 ? "border-t" : ""
          }`}
        >
          <button
            type="button"
            className="flex-grow text-left"
            onClick={() => select(page)}
          >
            {page.getName() || "Untitled page"}
          </button>
          {selected !== page && (
            <>
              <button type="button" onClick={() => remove(page)}>
                <MdDelete />
              </button>
              <button type="button" onClick={() => handleEdit(page)}>
                <MdEdit />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
