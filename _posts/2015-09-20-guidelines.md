---
layout: post
author: "Khaled A"
title:  "Documentation Guidelines"
date:   2015-09-20 10:12:45
summary: "An HMC documentation set of guidelines"
categories: HMC Doc
tags: Docs Guidelines
featured_image: /images/cover.jpg
---

If you are planning to contribute to HMC documentation, we are excited for you...but please read the following documentation guidelines before you start on your new task. To give you a good perspective on things, please check our our documentation tutorial [here](tutorial.md).

## Naming Convention:

* Make sure the folder & file names are all lower case and no spaces.
* Hyphens `-` are allowed in the folder & file names to separate intention i.e. user-stories.
* Use nouns only to describe purpose of the folder or file.

## Organization:

* Always provide a link from the top of the document to the items i.e. Table of content.
* Please remember that the `README.md` file is your friend! It auto renders when a directory is accessed. In other words, if you create a sub-directory in which you are planning to describe a single section, you can use the README file...do not create another .md file....there is no need.
* In the `README.md` file of every repository, please include a reference to these guidelines...something like this:


>  please note...if you are planning to contribute to this repository or any of HMC's documentation, please read the guidelines [here](https://github.com/hmcdocs/guidelines/blob/master/README.md).

* Avoid committing binary files! Although there is nothing wrong with this, but it does cause problems when files get changed mainly because it is difficult to merge binary changes. The `.gitignore` file can be used to exclude these binary files.   

## Exports:

Every repository should be equipped with a way to auto-export its content to HTML and PDF. To do this, we provide some [Node](http://www.nodejs.com) modules that will handle the task. Please note that this step has to be performed in the desktop and usually renders the output to `dest-html` and `dest-pdf` directories. It also may require some development skills....so the task of exporting may be initially performed by the developers. Eventually though, we will automate this process and publish the documentation in HTML and PDF on some internal servers. In the meantime, if you wish to experiment with exports, here are some details.

* Open up a command prompt at the root of the repository
* Assuming that Node is installed, run the following commands:

```
npm install gulp --save-dev
npm install gulp-markdown --save-dev
npm install gulp-markdown-pdf --save-dev
```

* Once completed, you can now run a gulp task that creates the HTML or PDF files (following the same directory structure) in the `dest` folder:

```
gulp html
gulp pdf
```
