---
author: Hugo Authors
title: Math Typesetting
date: 2024-08-02
description: A brief guide to setup Math Typesetting
tags:
  - math
params:
  math: true
---

Mathematical notation in a Hugo project can be enabled by using third party JavaScript libraries.
<!--more-->

\begin{aligned}
KL(\hat{y} || y) &= \sum_{c=1}^{M}\hat{y}_c \log{\frac{\hat{y}_c}{y_c}} \\
JS(\hat{y} || y) &= \frac{1}{2}(KL(y||\frac{y+\hat{y}}{2}) + KL(\hat{y}||\frac{y+\hat{y}}{2}))
\end{aligned}

> Check out [Hugo Math Typesetting](https://gohugo.io/content-management/mathematics/) for more details.

- To enable Math Typesetting globally set the parameter `math` to `true` in a project's configuration
- To enable Math Typesetting on a per page basis include the parameter `math: true` in content files

Configure the `hugo.yaml` file to setup goldmark to support Math Typesetting:

```yaml
markup:
  defaultMarkdownHandler: goldmark
  goldmark:
    extensions:
      passthrough:
        enable: true
        delimiters:
          block:
            - ["$$", "$$"]
            - ["\\[", "\\]"]
          inline:
            - ["\\(", "\\)"]
```

Note: You can also set the parameter `math.engine` to `katex` to use [KaTeX](https://katex.org/) instead of MathJax.

### Math

This is an inline \(a^*=x-b^*\) equation.

These are block equations:

\[a^*=x-b^*\]

\[ a^*=x-b^* \]

\[
a^*=x-b^*
\]

These are also block equations:

$$a^*=x-b^*$$

$$a^*=x-b^*$$

$$
a^*=x-b^*
$$

When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$


### Chemistry

$$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}$$
