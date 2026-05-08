import os

icons_dir = "assets/icons"
output_file = "assets/icons/sprite.svg"

symbols = []

if not os.path.exists(icons_dir):
    print(f"Directory {icons_dir} not found")
    exit(1)

for filename in os.listdir(icons_dir):
    if filename.endswith(".svg") and filename != "sprite.svg":
        filepath = os.path.join(icons_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
            # Extract viewBox
            viewbox = "0 0 32 32" # Default
            if 'viewBox="' in content:
                viewbox = content.split('viewBox="')[1].split('"')[0]
            
            # Simple cleanup: remove XML declaration and extract inner content
            # This is a bit naive but should work for typical SVGs
            if "<svg" in content:
                # Find the end of the opening svg tag
                start_idx = content.find(">", content.find("<svg")) + 1
                # Find the start of the closing svg tag
                end_idx = content.rfind("</svg>")
                if end_idx != -1:
                    inner = content[start_idx:end_idx].strip()
                    icon_id = filename.replace(".svg", "")
                    symbols.append(f'  <symbol id="icon-{icon_id}" viewBox="{viewbox}">\n    {inner}\n  </symbol>')

sprite_content = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n' + "\n".join(symbols) + "\n</svg>"

with open(output_file, "w", encoding="utf-8") as f:
    f.write(sprite_content)

print(f"Successfully generated {output_file} with {len(symbols)} symbols.")
