---
title: I’m super good at CSS and I don’t recommend the cascade, don’t @ me
date: '2019-01-11'
---

I’ve been writing CSS for over 13 years. I’ve written CSS for very large news websites, high traffic blogs, micro-sites, small software applications and massive enterprise software applications.

I’m part of the “old guard”. I’ve been around the block enough to know how good it was in the “old days”. To know it was simpler back then. I’ve wrangled IE5.5, I know “how good these kids have it these days”.

In almost all but small, document based website cases I can tell you from experience that the cascade is kind of a terrible idea for today’s teams, organisations, and products and it’s got _nothing_ to do with _“not knowing CSS”_.

## What is “the cascade”

Lets’ start by defining what the cascade is. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade):

> The **cascade** is an algorithm that defines how to combine property values originating from different sources

> Only CSS declarations, that is property/value pairs, participate in the cascade.

> The CSS cascade algorithm's job is to select CSS declarations in order to determine the correct values for CSS properties

> Though style sheets come from these different origins, they overlap in scope; to make this work, the cascade algorithm defines how they interact

So, the cascade take a bunch of overlapping CSS declarations, from a bunch of different places, and figures out which declaration wins. Easy.

## What the cascade isn’t

Now, lets’ understand what the cascade is _not_:

### Inheritance

It is not inheritance. That is the _absence_ of a style declaration on a node, to which _some_ of its style properties will be inherited from its parent DOM nodes further up the document tree.

### Reusability

It is not the ability to reuse or share styles between elements or different types of elements. That is usually down to writing style selectors based on tag names, attributes, classnames or IDs (not recommended) that are applied to those elements.

Today we also often use the concept of componetisation, which is a means of abstracting common markup and style selectors into reusable groups or patterns, to share styling across a website or application.

## Why is it so bad?

Well, don’t take my word for it. Over the years, we’ve built a tonne of different CSS methodologies to help us write “maintainable CSS”.

BEM, SMACSS, ITCSS, SUIT CSS, OO CSS and Atomic CSS all come from the same angle of promising more maintainable CSS architectures and codebases. How do they do this? By limiting the cascade by reducing the impact things like the specificity of our selectors, descendant selectors and location dependent styles have on the visual appearance of the document.

These things all affect the cascade by using the cascade algorithm to influence which style declarations “win” and set the values for the style properties on any given node.

We do this because we know from experience that selectors from different locations, authors, teams, or applications that try to set style properties on the same node, will often have inadvertent, adverse affects on the way our webpage looks.

This is how we found ourselves in the specificity wars. In battles with our neighbouring teams who are shipping features to the same document, but occupy the same global styling namespace.

We do it so that we don’t get style clashes, our colleagues work isn’t affected, and webpage appearances don’t break.

## What’s your point, Simon?

My point is simply this:

The next time you’re in a twitter sub-tweeting war about the virtues of how good CSS is, and there’s absolutely nothing wrong with it, and everyone else is at fault for not “learning CSS” properly, maybe pause for a second. Cast you mind back to all those things we advocate as being best practices for authoring “good” and “maintainable” CSS, and consider what they are really trying to mitigate from the design of CSS.

Maybe there is some flaws in the old beast after all.

🤔
