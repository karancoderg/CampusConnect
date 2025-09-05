from pathlib import Path

# A list of all the component files to be created inside the 'ui' directory.
ui_components = [
    "accordion.tsx",
    "alert-dialog.tsx",
    "alert.tsx",
    "aspect-ratio.tsx",
    "avatar.tsx",
    "badge.tsx",
    "button.tsx",
    "calendar.tsx",
    "card.tsx",
    "checkbox.tsx",
    "collapsible.tsx",
    "command.tsx",
    "context-menu.tsx",
    "dialog.tsx",
    "dropdown-menu.tsx",
    "form.tsx",
    "hover-card.tsx",
    "image.css",
    "image.tsx",
    "input.tsx",
    "label.tsx",
    "loading-spinner.tsx",
    "member-protected-route.tsx",
    "menubar.tsx",
    "navigation-menu.tsx",
    "popover.tsx",
    "progress.tsx",
    "radio-group.tsx",
    "scroll-area.tsx",
    "select.tsx",
    "separator.tsx",
    "sheet.tsx",
    "sign-in.tsx",
    "skeleton.tsx",
    "slider.tsx",
    "switch.tsx",
    "table.tsx",
    "tabs.tsx",
    "textarea.tsx",
    "toast.tsx",
    "toaster.tsx",
    "toggle-group.tsx",
    "toggle.tsx",
    "tooltip.tsx",
]

def create_ui_components(base_dir="ui"):
    """Creates the ui directory and all component files within it."""
    
    # Create the base 'ui' directory.
    ui_path = Path(base_dir)
    ui_path.mkdir(exist_ok=True)
    print(f"Ensured directory exists: {ui_path.resolve()}")

    # Loop through the list and create each file.
    for component in ui_components:
        file_path = ui_path / component
        file_path.touch() # Creates an empty file.
        print(f"Created file: {file_path}")
        
    print(f"\n✅ UI component structure created successfully in '{ui_path}' folder!")

if __name__ == "__main__":
    create_ui_components()