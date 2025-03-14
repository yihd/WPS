import markdown

# Read the Markdown file
with open("README.md", "r", encoding="utf-8") as md_file:
    md_content = md_file.read()

# Convert Markdown to HTML
html_content = markdown.markdown(md_content)

# Write the HTML to a new file
with open("README.html", "w", encoding="utf-8") as html_file:
    html_file.write(html_content)

print("Conversion complete! HTML file saved as README.html")