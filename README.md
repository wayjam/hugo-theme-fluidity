# Theme Fluidity

A fluid and responsive Hugo theme

## Features

- Fluent Design
- Search Support
- Code Highlight
- Dark Mode
- Responsive
- Archive Page

## Installation

### Hugo Module

> https://gohugo.io/hugo-modules/use-modules/

```bash
hugo mod init github.com/<your_user>/<your_project>
```

```yaml
module:
  imports:
    - path: github.com/wayjam/hugo-theme-fluidity
```

### Git Submodule

```bash
git submodule add https://github.com/wayjam/hugo-theme-fluidity.git themes/hugo-theme-fluidity
```

set theme in `hugo.yaml`

```yaml
theme: hugo-theme-fluidity
```

## Configuration

Site configuration see [exampleSite/hugo.yaml](exampleSite/hugo.yaml)

### About Page

Create a new page in the `content` directory, for example <exampleSite/content/about.md>

### Archives Page

Create a new page in the `content` directory, for example <exampleSite/content/archives/_index.md>

### Search Page

Create a new page in the `content` directory, for example <exampleSite/content/search/_index.md>

#### Google Search

```yaml
params:
  search:
    provider: google
```

#### PageFind

```yaml
params:
  search:
    provider: pagefind
```

Create a pagefind config file, for example <exampleSite/pagefind.yml>

## Credits

- [fluent web components](https://www.fluentui.com/components/web)
- [tailwindcss](https://tailwindcss.com/)

## License

[MIT](LICENSE)