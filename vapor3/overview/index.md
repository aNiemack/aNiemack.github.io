---
Layout: default
title: Overview
---
Vapor 3 Overview
----------------

VAPOR version 3.x (VAPOR3) represents a complete refactoring of the VAPOR 2.x codebase. The effort was begun in earnest in 2015, and continues as of the Fall of 2017. VAPOR3 is not expected to be feature complete, providing all of the major functionality found in VAPOR2, until 2018 or 2019. The major changes in VAPOR3 include:

**A new data model:** The data model in VAPOR2 is highly restrictive: all data in a data set are expected to be sampled on a single, fixed-resolution regular grid. Numerical model outputs that did not conform to this highly simplified view had to be resampled to meet this restriction. VAPOR3 provides a much more flexible data model that takes inspiration from the NetCDF Climate Forecast (CF) Conventions. 

**Ease-of-use:** Much effort has been put into the VAPOR3 Graphical User Interface (GUI) in an effort to make it much easier to use.

**Extensibility:** The internals of VAPOR3 have been designed to facilitate the addition of new, or modification of existing, features by the user community. In particular, the VAPOR3 design is intended to ease the process of developing new renderers, or adding support for new scientific file formats.

 
### Roadmap & More

A detailed roadmap and futher information on VAPOR3 is available [here](https://www.vapor.ucar.edu/sites/default/files/VAPORRoadmap.pdf).
