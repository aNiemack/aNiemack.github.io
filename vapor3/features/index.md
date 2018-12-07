---
Layout: default
title: Features
---

VAPOR3's feature set differs from VAPOR2 with regard to the supported data types, supported renderers, and within the application's GUI.  Current features regarding these three categories are detailed below.
 
### Supported Model Outputs and  Data Types

VAPOR3 supports data sampled on both structured and unstructured grids. The addition of support for unstructured grids, and greatly improved support for structured grids, is one of the most signficant changes between VAPOR3 and VAPOR2.
 
VAPOR3's beta release supports outputs from WRF, MPAS-A, POP atmosphere and ocean models, and, in general, supports NetCDF Climate and Forecast (NetCDF CF) compliant data sets.  In some cases there are restrictions in terms of what VAPOR can do with these types, listed below.  These restrictions may be relaxed in the future. The VAPOR Team is continuously adding support for more data types.

*    WRF - Weather Research and Forecast
     -   WRF-ARW model output is currently supported
     -  WRF-NMM is currently not supported

*    MPAS-A - Model for Prediction Across Scales - Atmosphere
     -   MPAS-A model output prior to version 5 are not guarteed to be compatible
     -   Converstion from MPAS-A data into VAPOR3's VDC file format is currently unsupported
     -   The model output's grid topology may not change over time

*    NetCDF CF - NetCDF Climate and Forecast
     -   It is our goal to fully support NetCDF CF data on structured grids, but at this point we've only been able to run limited tests
     -   If VAPOR3 fails to operate on a NetCDF CF compliant dataset (with a structured grid!) please email us at vapor@ucar.edu

*    POP - Parallel Ocean Program
     -   Outputs from POP2 prior to version 2.1 are not guaranteed to be compatible
     -   VAPOR does not currently support the conversion of POP data into its VDC file format

### Simultaneous Dataset Visualization

One of VAPOR3's most significant features is its ability to create renderings of datasets that come from different models, simultaneously.  For example, multiple nested WRF domains may be loaded and rendered alongside each other, to show how the effects of coarsened grids on simulated phenomena.  Ocean and atmosphere models may be rendered together to demonstrate the interactions that occur at their interface.

### Renderers & Tools

VAPOR3 Beta supports a limited number of renderers compared to its predecessor, VAPOR2.  New renderers will be incorporated as development continues.  Currently, VAPOR3 only supports the rendering of 2D variables, using the following renderers.

*    TwoD Data
*    Barbs
*    Contours
*    World Image

Coming soon:

*    Direct Volume Rendering (DVR)
*    Probes and slices
*    Flow integration
*    Isosurfaces
*    3D models

Also available in VAPOR3 are the following numerical analysis tools

*    Statistics 
*    Plot utility

### New Graphical User Interface

VAPOR3's user interface has been refactored to present users with their options in a more organized way that is also consistent across each renderer.  This consistency has been achieved by categorizing each renderer's parameters into the three tabs listed below, which are further discussed in the Training section.

*    Variables
*    Appearance
*    Geometry

