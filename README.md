# Theme Fluidity

[![hugo-theme-fluidity](https://img.shields.io/badge/Hugo%20Theme-%40Fluidity-blue)](https://themes.gohugo.io/hugo-theme-fluidity/)
[![Hugo](https://img.shields.io/badge/Hugo-%5E0.128.0-orange)](https://gohugo.io/)
![GitHub](https://img.shields.io/github/license/wayjam/hugo-theme-fluidity)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wayjam/hugo-theme-fluidity)

A fluid and responsive Hugo theme.

![screenshot](https://raw.githubusercontent.com/wayjam/hugo-theme-fluidity/main/images/tn.png)

## Features

- Fluent Design mixed with [Tailwind CSS](https://tailwindcss.com/)
- Search Support
- Code Highlight
- Dark Mode
- Responsive
- Archive Page

Checkout [demo](https://wayjam.github.io/hugo-theme-fluidity/) now.

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

```bash
hugo mod npm pack && npm update
```

### Git Submodule

```bash
git submodule add https://github.com/wayjam/hugo-theme-fluidity.git themes/hugo-theme-fluidity
```

set theme in `hugo.yaml`

```yaml
theme: hugo-theme-fluidity
```

```bash
hugo mod npm pack && npm update
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

1. Step 1: Set the provider to pagefind

```yaml
params:
  search:
    provider: pagefind
```

2. Create a pagefind config file, for example <exampleSite/pagefind.yml>
 
3. Install pagefind: `npm i pagefind`

4. Run pagefind before every build: `npx pagefind`

## License

[MIT](LICENSE)