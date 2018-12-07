---
Layout: default
---
**VAPOR** FAQ
=============

### Installation

1. [What platforms is VAPOR supported on?](#support)
2. [What are the system requirements?](#req)
3. [Why does vaporgui fail to start?](#start)

### General

1. [What file formats are supported?](#format)
2. [How do I translate my data into VAPOR's VDC format?](#translate)
3. [Why don't VAPOR's IDL routines work?](#IDL)
4. [How do I submit a bug-fix or feature requests?](#fix)
5. [Why is the text in vaporgui sometimes unreadable?](#text)
6. [How can I visualize data that is stretched or warped in the Z-direction?](#visualize)
 
### Volume Rendering

1. [Why is my volume rendering performance poor?](#perf)
2. [Which volume rendering engine should I use?](#rend)
3. [Why do I have trouble rendering high resolution volumes?](#reso)

### Flow Visualization


## Installation

<h3 id="support">What platforms is VAPOR supported on?</h3>

Vapor should run on most UNIX (including Mac OS X) and Windows systems. Check the download page for available binaries. Binaries are built for the systems we have direct access to and generally represent the most tested platforms. It is strongly recommend that the binary distribution is used and installation from source is only attempted as a last recourse.

<h3 id="req">What are the system requirements?</h3>

    We recommend a minimum of 512 MBs of main memory. VAPOR relies heavily on RAM for caching data in order to improve performance. So the more memory you have, the better the performance, in general.This is particularly true when animating through temporal data.
    A graphics card with 3D hardware texture support and an OpenGL driver that can take advantage of the card are a must. Note that standard Linux distributions come with a generic driver that will work on all systems, but this will usually not give adequate performance. For best performance a driver provided by the graphics card vendor is essential. If you plan to use Linux and have not yet purchased a graphics card, you should check that the card you are considering purchasing has a driver optimized for Linux.

<h3 id="start">Why does vaporgui fail to start?</h3>

The most likely cause of the vaporgui failing to start on UNIX platforms (include the Mac) is that the X server is not running. This is particulary problematic on the Mac where X11 is not the native windowing system and is frequently not running. The Mac help system can provide information on starting the X11 server.

## General

<h3 id="format">What file formats are supported?</h3>

Only one: VAPOR's own VDC. The data model that VAPOR is designed around is one that supports hierarchical data representation. Currently only VDC supports this model, while also permitting data to be distributed across multiple files in order to accommodate terascale data systems. VAPOR provides command line tools as well as C++ and IDL language bindings to libraries that may be used to help import foreign data sets into a VDC. For guidance on constructing a translation tool for your own format we suggest examining the raw2vdf program source code.

<h3 id="translate">How do I translate my data into VAPOR's VDC format?</h3>

Documentation on importing data into VAPOR is available here.

<h3 id="IDL">Why don't VAPOR's IDL routines work?</h3>

Note that VAPOR's IDL routines do not currently work with VDC type 2. With VDC type 1 data, there are two likely reasons why you might not be able to invoke IDL language extensions, provided by VAPOR, from an IDL session. The first is quite simply that your version of VAPOR wasn't built with IDL support. Look in $VAPOR_HOME/lib for the IDL support libraries libidl_vdfmodule.dlm and libidl_vdfmodule.so. If either of these files is missing, or cannot be found because your user environment is not set up correctly, you will not be able to call the VAPOR provide IDL routines. IDL will issue a message along the lines of "Variable is undefined...". The second reason VAPOR's IDL routines may fail is if the version of IDL you are running is incompatible with the VAPOR provided IDL support libraries. If this is the case IDL will generate messages such as "Error loading sharable executable". This condition can arise from trying to mix 32 and 64 bit binaries. Make sure both your IDL executable and VAPOR provided IDL support libraries are binary compatible.

<h3 id="fix">How do I submit a bug-fix or feature requests?</h3>

Bug fixes and feature requests can be submitted from the SourceForge project site for vapor: www.sourceforge.net/projects/vapor/support , or simply send mail to vapor@ucar.edu. Please be sure to include pertinent information such as your platform and OS version, the version of VAPOR you are running, and as much detail as possible on how to reproduce your problem. For problems with the VAPOR GUI, mages and VAPOR session files can extremely helpful as well.

<h3 id="text">Why is the text in vaporgui sometimes unreadable?</h3>

Future releases of VAPOR will provide preference settings that may be used to change the font size.

<h3 id="visualize">How can I visualize data that is stretched or warped in the Z-direction?</h3>

VAPOR layered datasets support arbitrary vertical displacement at each position on the grid.  The basic requirements are:

*    Specify the option "-gridtype layered" when you use the vdfcreate command.
*    Create a 3-D variable, named "ELEVATION" that specifies the height at each (x,y,z) in the data grid.
*    (Optionally, if you want to visualize data on the bottom of your grid, e.g. terrain-mapped data) create a 2D variable which specifies the elevation at each (x,y) at the bottom of the grid.  (Such a variable is named "HGT" in a WRF-ARW dataset.)

More detailed instructions are provided in Layered Datasets.

If the stretching is constant (i.e. the same stretch is used at each horizontal coordinate) then the VAPOR VDC can be specified to be "stretched", and the stretch factors are specified in the vdf file.

## Volume Rendering

<h3 id="perf">Why is my volume rendering performance poor?</h3>

Volume rendering in VAPOR is performed using 3D texture mapping. If your graphics system does not support hardware-accelerated 3D texture mapping, or your OpenGL driver does not expose this capability, rendering will be performed in software. Make sure you have a 3D texture mapping capable card (check the features listed by the vendor), and make sure your OpenGL driver is configured properly. Any mid-range or better card produced from 2005 or later should suffice. Also, see the next FAQ.

Another source of poor volume rendering performance is that the maximum texture brick size chosen by the renderer may not be optimal for your graphics card/driver. In general, larger bricks perform better, particuarly if the use of a larger brick allows the entire data volume to fit into a single texture, but this is not always the case. With some card/driver combinations better performance will be obtained by using a texture size smaller or larger than the one chose by the application. Texture size may be set by the user via the "Edit/Edit Sessions/graphics memory size" parameter.

<h3 id="rend">Which volume rendering engine should I use?</h3>

Vapor presently supports three different volume rendering engines: 3DTexture, 3DTexture-Shader, and Volumizer. The rendering engine is selectable by the Renderer Type menu item on the DVR panel. Not all rendering engines are available on all systems. In particularly, Volumizer relies on license software from SGI and is only available if you build and install VAPOR from source, explicitly enabling SGI Volumizer during the build. The 3DTexture-Shader engine relies on graphics cards supporting programmable shaders only available with modern graphics cards and later versions of OpenGL (1.4 or greater). If you have a recent graphics card, and the 3DTexture-Shader engine is not listed by VAPOR as available, make sure you have the latest OpenGL driver from either ATI or nVidia installed. Note: under Linux these drivers tend to get clobbered every time you upgrade the OS, requiring manual re-installation. The 3DTexture engine should run on any system with 3D texture mapping support. At present, on most systems Volumizer will give the best performance, followed by 3DTexture-Shader, then 3DTexture.

<h3 id="reso">Why do i have trouble rendering high resolution volumes?</h3>

The OpenGL specification provides no mechanism for determining the amount of hardware texture memory available on a graphics card. When an attempt is made to load a texture that is too large for the GPU the OpenGL driver may switch to software rendering, resulting in poor frame rates, or in some cases it may corrupt the data resulting in the display of garbage. As a workaround the user may explicitly limit the amount of texture VAPOR will attempt to load, forcing VAPOR to virtualize texture memory enabling the rendering of volumes too large to be contained in video memory. When virtual texture memory is used performance will not be as good as when the entire texure volume is loaded at once, but generally yeilds better performance than letting the OpenGL driver handle the larger-than-memory texture. The maximum texture size may be set with the Specify graphics texture size parameter under the Edit/Edit Session Parameters menu.
