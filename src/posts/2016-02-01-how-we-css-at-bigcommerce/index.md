---
title: How we "CSS" at BigCommerce
date: '2016-02-01'
---

TL;DR [Our SASS Style Guide is available on GitHub](https://github.com/SiTaggart/sass-style-guide).

CSS is hard. Writing good CSS is harder. Writing good CSS with a big team on a large codebase… wow, just wow.

We're not exactly unique as a software company; 120 engineers, 4 offices, 3 countries, 3 time zones and 7 years present an environment for a codebase we all know well. Everyone has had a go, there are 30 different button styles, 4 variations of your "Brand color" and a package.json / bower.json file listing every possible JavaScript package on the Internet. CSS just seems to be, in relative comparison to other languages, the most poorly neglected child, where the least amount of care is particularly given. There's no set rules, no conventions and no built in tools to prevent you from yourself. It's a minefield. We've all been there and a lot of people and teams will still be neck deep in it.

At BC we decided that we could at least tackle some of the common problems in writing a lot of CSS, just by setting some ground rules and making everyone who contributes CSS follow them. Our SASS Style guide is nothing new or groundbreaking, and the concept is very similar to AirBnB's excellent [JavaScript Style guide](https://github.com/airbnb/javascript). I'm not going to copy and paste verbatim in this blog post either, instead you can [find it on GitHub](https://github.com/SiTaggart/sass-style-guide) and have a read in full for yourself. I did think, however, that it would be much more useful to call out some specific rules and explain them in greater detail, list the stack we build on and the tools we use to help everyone stay on the same page.

## The Aim

First and foremost, what we wanted to achieve wasn't trying to be clever, cutting edge or highly optimised. We were after an open policy; sensible over optimised, clear over clever. It was aimed at making the codebase easy to on-board and share across a large team. You'll notice language like "readable and understandable", "simple", "short as possible but as long as necessary", and "Just because you can, doesn't mean you should" throughout the document to give us a common sense approach to writing CSS.

## Principles

Our CSS contribution is based on some guiding principles to how we think about CSS and components. I'll call out a couple of super important ones to us as they're either key or not particularly obvious:

> Don't try to prematurely optimise your code; keep it readable and understandable

Our CSS code base is SASS, specifically SCSS syntax. SASS is wonderful, powerful and terrible all at the same time. With any powerful tool, comes the risk of software engineers doing the very thing they're _really_ good at: Over Engineering things.

The phrase "Just because you can, doesn't mean you should" applies a lot to SASS. I've seen some really crazy complex SASS functions generating a bunch of crazy clever CSS and the danger is, not many people really pay much attention to the output. Output is pretty important, especially with weight and specificity. Also clever syntax or selector nesting like the [Parent Selector Suffix](http://thesassway.com/news/sass-3-3-released#parent-selector-suffixes) are neat, but are hell-a-difficult to search for in a codebase.

```css
/* Try to avoid */
.component {
  &-parentSelectorSuffix {
    ...;
  } /* .component-parentSelectorSuffix {} */

  .component-childSelector {
    ...;
  } /* .component .component-childSelector {} */

  .notSoObviousParentSelector & {
    ...;
  } /* .notSoObviousParentSelector .component {} */
}
```

Don't be clever, be a good citizen, play nice with others. It makes it really hard for me to just pick up your code and contribute to it. Make it simpler and let post-processing do some of the clever stuff, I'll thank you for it later.

> Break down complex components until they are made up of simple components

Undeniably the most important thing when composing components in your HTML and CSS patterns. Naming conventions like BEM or SUITCSS or SMACSS are really handy tools for keeping your modules modularised, but following the "convention" too strictly can lead to complex and long class names when dealing with deeply nested child elements.

Start abstracting out some common child patterns as early as you can to prevent these kind of dreaded dreaded selectors:

```css
.componentName__childName__otherChildName__thisIsSillyNow__nopeYouTotallyMissedThePointOfThis--modifier {
    …
}
```

> Build your component as a mixin which outputs optional css

This is an interesting one. We as a team build patterns, common markup and CSS rules for displaying a certain type of data in the UI, in a particular way. Our framework doesn't output CSS by default, you have to opt in to the components you want.

Our framework also serves multiple, varied domains or properties, where the data might be the same, the pattern might be similar but for whatever reason the name we've chosen for our very generic pattern doesn't suit. Maybe our "card" component is better suited to be your "product" component in the context of that domains codebase. So every component we build is always a mixin, wrapped in a generic class name.

```css
/* The media object as an example */
.media {
  @include media;
}

.mediaTable {
  @include media('table');
}
```

Because you can opt out of the CSS that's generated, you are free to rename the component to your choosing, include the mixin, and still get the agreed upon design pattern.

## Some Key Rules to Highlight

I'll highlight some key rules we think are important to a happy codebase, used on a large-ish product.

### Specificity [(Link)](https://github.com/SiTaggart/sass-style-guide#specificity)

Aim for selectors that are as low in specificity as you can humanly make them. It'll help abstract components into smaller chunks, allow for greater re-use and re-mix of patterns, and it'll stop you having a lot of specificity clashes in the future.

```css
/* Avoid styling IDs */
#component { … }

/* Avoid styling descendant elements */
.component h2 { … }

/* Avoid element qualified selectors */
div.component { … }

/* Avoid overly specific rules */
ul.component li span a:hover { … }
```

### Declaring Values [(Link)](https://github.com/SiTaggart/sass-style-guide#when-declaring-values)

When building a large codebase of patterns, try to only style the property you are explicitly concerned with to avoid overzealously resetting something you might want to inherit.

- `background-color: #333;` over `background: #333`
- `margin-top: 10px;` over `margin: 10px 0 0;`

Declaring a shorthand property of background for example, resets `background-position`, `background-image`, `background-size` etc which you may not want to do. Play nice with others.

### Declaration Order [(Link)](https://github.com/SiTaggart/sass-style-guide#declaration-order)

`@extend` first, then `@include`, then set your properties. Ideally the extend and include don't have to override or clash with your properties. Followed by my personal favourite rule, **alphabetical order**, always.

There's been a lot of think pieces by lots of different people about all the magical and logical ways people like to group their CSS properties together inside a rule. Don't force people to learn your opinion or "logic" each time a new starter comes onboard. The order _**literally**_ doesn't matter. Aim for common sense, predictability and wide adoption; a lot of people know the alphabet and it'll let you spot repeat declarations easily.

```css
.component {
  @extend %a-placeholder;
  @include silly-links;
  color: #aaa;
  left: 0;
  line-height: 1.25;
  min-height: 400px;
  padding: 0 20px;
  top: 0;
  width: 150px;
}
```

### Nesting [(Link)](https://github.com/SiTaggart/sass-style-guide#nesting)

Don't. Or at least try your damned hardest not to.

The output of your compiled CSS is extremely easy to lose track of. You can easily break [Specificity](https://github.com/SiTaggart/sass-style-guide#specificity) and [Performance](https://github.com/SiTaggart/sass-style-guide#performance) guidelines when creating your selectors when you start nesting with SASS. Just because you can, doesn't mean you should. We aim for a maximum of 1 level deep of nesting, with the use of common sense when that's not achievable.

```css
.panel-body {
  position: relative;
}

.panel-sideBar {
  z-index: 10;
}

.panel-sideBar-item {
  cursor: pointer;
}

.panel-sideBar-item-label {
  color: #aeaeae;

  &.has-smallFont {
    font-size: 13px;
  }
}
```

### Variable Names [(Link)](https://github.com/SiTaggart/sass-style-guide#variables)

Abstract the name of your variables. Don't name your variables, for example, the name of the colour you are setting. This is no longer a variable, and is no different to finding and replacing a hex colour code in your codebase, if you decide to change the value of `$background-color-blue`, to be red.

- `$color-brandPrimary` over `$bigcommerceBlue`

### Maps, and Map Functions [(Link)](https://github.com/SiTaggart/sass-style-guide#component--micro-app-level-variables)

As described by the excellent Erskine Design Article, [Friendlier colour names with SASS maps](http://erskinedesign.com/blog/friendlier-colour-names-sass-maps/), we use SASS maps for a lot of global style properties, not just colours, that our developers are going to need frequent access to.

It allows a simple, predictable API for them and a set scale for things like z-index, font-weight and line-height. We'll cover this in much more detail is a coming blog post.

```css
color: color('grey', 'darker');
font-size: fontSize('largest');
line-height: lineHeight('smaller');
z-index: zIndex('highest');
```

### Component Naming Conventions [(Link)](https://github.com/SiTaggart/sass-style-guide#components)

We took pretty heavy influence from [SuitCSS](http://suitcss.github.io/) and slightly modified it to our tastes and needs. For example we opted for camel case instead of pascal case.

As I mentioned earlier, correctly naming your descendant children is pretty important and we take a fairly pragmatic approach. Just because an element is a descendant of a descendant to the root of your component, doesn't mean it _has_ to live at that level in the DOM. It could easily function the same way and be adjacent to the first descendant.

```html
<article class="tweet">
  <header class="tweet-header">
    <img class="tweet-avatar" src="{$src}" alt="{$alt}" />
    ...
  </header>
  <div class="tweet-body">
    ...
  </div>
</article>
```

When dealing with plurals of something, perhaps the descendant name is better suited to be the singular version, and not appended to the parent name.

```html
<ul class="breadcrumbs">
  <li class="breadcrumb">
    <a class="breadcrumb-label" href="#"></a>
  </li>
</ul>
```

It's much better to avoid verbose descendant class names, by keeping class names as short as possible and as long as necessary.

## Tools and Enforcement

As I've mentioned our new CSS code base is in SASS and of course like all the other cool kids, we use [libSass](http://sass-lang.com/libsass) to compile our stylesheets. There are a couple of projects that use Ruby Sass, and the performance slow down is extremely noticeable.

I also mentioned about doing clever things with your code _**post**_ compilation. An example of this is vendor prefixes for CSS features that may not be fully adopted by certain browsers. Instead of littering our code with these vendor prefixes, proprietary implementations, or making Sass do a bunch of extra grunt work, we use Autoprefixer to do it for us after Sass has done it's job.

### Optimisation

In terms of output optimisation, we use [CSSO](http://css.github.io/csso/) to optimise our code when we perform a deploy of our core CSS libraries. CSSO does the usual things you'd expect from minification like stripping out all the whitespace, but it also does some structural optimisations on the code for us. Grouping like selectors together from different components, shortening syntax where it can, shaving off small bites that we may introduce in our more "common sense", "clear over clever" approach to writing our code. Sounds risky, I know, but so far we haven't noticed anything breaking and it works really well.

I'm sure some of you will have read along and through the guide and thrown your arms up in dismay at "the repetition of code" we'd introduce with some of our rules. Well CSSO helps us deal with that _after_ the fact, and we can rely heavily on Gzip to remove some of the other repetitive code snippets that might remain. This leaves our code base readable, clear and obvious. Let tools do the work for you.

### Linting

Lastly, how do you check your fellow team members are adhering to the rules? A good Pull Request policy will help most of the time, but on large teams that's not exactly scalable from a small CSS team.

We make use of [scss-lint](https://github.com/brigade/scss-lint) to analyse our code as we write it, and upon creating a pull request to the core libraries (just in case you thought you could just sneak that CSS in without spinning any of it up in a browser). If it fails to adhere to the styleguide, your code doesn't build on your machine, travis fails and your PR is marked as so. Helpfully we include the [YAML file for our rule set](https://github.com/SiTaggart/sass-style-guide/blob/master/.scss-lint.yml) which seems to get us really close to the style guide, so anyone can follow it. This configuration is also stored in our common grunt tasks that every new Front End project starts with, so you get CSS code linting out of the box.

## What actually happened

Despite our best efforts, it's still really difficult to enforce these ideas over a wide team. The tools only get you so far and you can still contribute CSS that is functional but doesn't make the grade.

We found education and coaching worked best, coupled with the tools and guidelines as reference. I particularly found that in many cases you really have to learn from your own mistakes with CSS before it really "clicks". Writing functional CSS that "just does the job" is extremely easy to do. Learning to spot how that will play in a wider eco-system and predict what side effects it might cause in the future, takes some time.

On the plus side, distributing our linting rules as part of our grunt plugin package was extremely handy to gain adoption and people generally found it extremely useful. The conventions we put in place for our map based properties like fonts, sizes, spacing, line heights and z-indexes were certainly a highlight for our JavaScript Engineers, as it was completely predictable and easy to remember.

CSS in large teams on a large codebase is hard but you can make it suck less by implementing a few guidelines, tools and training sessions to help your teammates stay on the same page. Overall I think we've done a pretty good job so far.

Now, to preempt another one of those "But what about X which solves that better" moments I know you're having right now, I'd like to quickly acknowledge some of the great work people have been doing around this exact topic with regards to "[CSS in JavaScript](https://github.com/MicheleBertoli/css-in-js)" "[Inline CSS](https://speakerdeck.com/vjeux/react-css-in-js)" or the particularly awesome "[CSS Modules](http://glenmaddern.com/articles/css-modules)". These deal with legit problems, I'm not going to rubbish them whilst protecting the "old guard" way of doing CSS, though there are a few reasons why we haven't gone down this path. Some things we can't deal with. Some things we actually really like about CSS like media queries. Most of these ideas come from the React eco-system which we don't use. Most come from the fortunate place where the majority of your front-end is already in JavaScript, and ours certainly isn't. The chances are your codebase is newer than ours, significantly smaller or you've got more money and developers than sense. We envy you. It doesn't mean we or you are wrong.

## Summary

So that is our approach. Aimed for our environment, our eco-system and a place where (I imagine) a lot of other teams who aren't Facebook or live in a super ideal world, would find themselves in.

I hope it'll help you, because with the combination of a well reasoned, pragmatic code style guide that's fairly easy for people to understand, coupled with post processing tools and code linting, we are able to find a relatively happy place in terms of a large CSS codebase.

It's obviously not bullet proof, especially on it's own, and we'll be following up on this post with a few articles around "How we CSS" and how we make things "less terrible". We'll be tackling:

- Our CSS framework, Citadel, and how it helps us reduce and share code between completely different domain teams.
- Responsive and Scalable design patterns for building components that proportionally scale with browser size.
- Creating a simple developer API for dealing with common properties and sensible, predictable values for developer happiness.
- Creating a living Pattern-Lab for your organisation
- Techniques to deal with an enterprise scale design pattern library with the aim of creating consistency and reducing mutations and snowflakes.
