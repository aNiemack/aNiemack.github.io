---
Layout: download
title: Source Installation Guide
---
**VAPOR** Source Installation Dependencies
======================================

3rd Party Applications and Libraries
------------------------------------

**VAPOR** depends on a small number of 3rd party applications. Before you can begin the installation of **VAPOR** from source you must verify the existence of these 3rd party packages and know where they live on your system. If the **VAPOR** 3rd party dependencies do not already exist, or if they have incompatible version numbers, you must acquire and install appropriate versions. Note, in many instances a mismatched version number, particulary a higher version number than what is recommend, will cause no harm.

The list of 3rd party libaries used to build a specific release of **VAPOR** are available here.  Some of the dependencies will specify flags that will need to be applied when built from source.  If no flags are specified, binary installations may be used.

 
OpenGL Drivers
--------------
For best rendering performance it is imperative that hardware accelerated graphics are available on your system, and that an OpenGL driver, optimized for use with your graphics card, is installed. Under some operating systems, notably *Linux*, the hardware may be present, but the driver is absent (or misconfigured). The command below may be helpful on *Linux* systems for determining if your OpenGL driver is properly configured (look for the presence of either the nVidia or ATI vendor string, as appropriate for your hardware):

     glxinfo | grep version

Note that *Linux* is notorius for uninstalling vendor-provided OpenGL drivers during OS upgrades.


VAPOR Unix and Mac Source Installation
======================================
The instructions below describes the process for building and installing VAPOR on UNIX and Mac platforms.

> Note: it is strongly recommended that the binary installation be used if at all possible. Building from source can be difficult and time consuming.

Note to Mac users: the instructions below will not generate a Mac Application (.app file): the resulting vaporgui executable must be invoked from the command line.

Unpacking
---------
After resolving any of VAPOR library dependencies, you are ready to begin the build process. If you haven't done so already, download the source tar file. After downloading, uncompress and unpack the tar file, and then change working directories to the VAPOR source directory by using the following commands or their equivalents:

     gunzip vapor-x.x.x-src.tar.gz
     tar xf vapor-x.x.x-src.tar
     cd vapor-x.x.x-src 

where 'x.x.x' is the VAPOR version number.

Configuration
-------------
The first step in the compilation process is to edit the top-level *options.mk* file.
This file contains [gmake](www.gnu.org/software/make) Makefile macros that are used to inform the build system of the locations of various 3rd party packages, and also allows you to configure various optional components. In particular, the macros with "PATH" suffixes will in most cases need to be defined to point to the locations of various library and header file paths. Other macros of interest are the INSTALL_PREFIX and macros with the "IDL" prefix, which tell the build system where to install **VAPOR**, and control whether IDL support routines are generated, respectively. The most up-to-date, and complete descriptions of these and other variables are found as comments in the *options.mk* file itself.

Compiling and Installing
------------------------
Once the VAPOR installation system has been configured, you may compile by simply typing:

     gmake

or possibly just

     make

if your version of make is gmake compilant. The build process takes anywhere from a few minutes to a half an hour. After compiling the software, executable and libraries may be installed by executing

     gmake install

Executables, libraries, and header files will be installed to the installation target directory defined previously in the configuration step.

User Environment Setup
----------------------
The **VAPOR** suite of applications relies on a number of shared libraries. Users will be required to execute a configuration script prior to running any **VAPOR** commands. The script vapor_home/bin/vapor-setup.sh should be sourced by all users before starting a **VAPOR** session, where vapor_home is the value of the INSTALL_PREFIX_DIR macro found in the options.mk file used to configure vapor. For convenience it is advised that users place this command in their login script (.login for C shell or .profile for other shells). Once the variables are set in the login script, there is no need to run the environment script files for each session.

> C-shell derivative users (csh, tcsh)
>
> If you are a C-shell (csh, tcsh) user you must execute the following command prior to running any VAPOR utilities:
>
>              source vapor_home/bin/vapor-setup.csh
>      
>
> where vapor_home is the root of the installation directory for VAPOR.
>
> Bourne shell derivative users (ksh, bash, sh)
>
> If you are a Bourne shell (sh, bash, ksh) user you must execute the following command prior to running any VAPOR utilities:
>
>              . vapor_home/bin/vapor-setup.sh
>      
>
> where vapor_home is the root of the installation directory for VAPOR. Note the "." is the bourne shell command for sourcing a file.


VAPOR Source Windows Installation
=================================
Note that currently, on Windows, only the Microsoft Visual Studio 2010 build is supported. This can be used to build 64-bit (x64) versions of **VAPOR**. Send e-mail to vapor@ucar.edu if you have questions or problems with the Windows source build.
> Note: it is strongly recommended that the binary installation be used if at all possible. Building from source can be difficult and time consuming.

Microsoft Visual C++ 2010 is required.

The current 3rd party libraries for a Windows Source installation can be viewed [here](https://aNiemack.github.io/source).

Libraries and header files for the above can be downloaded here:

    vaporwin64deps2015.zip
    Vapor3rdParty.zip --what to do with these?

Download and unzip these files, creating directories named "Vapor3rdParty", plus "vaporwin64deps"

The VAPOR source download file is the same for Windows and Linux. On Windows, it’s necessary to have the programs "gunzip" and "tar" on the Windows machine. These programs can be obtained by installing Cygwin from the [Cygwin](http://www.cygwin.com) website. To convert the source download file to the full source code, first run 'gunzip vapor-2.6.0-src.tar.gz' and then run 'tar -xf vapor-2.6.0-src.tar'

Set the following environment variables, based on the files downloaded above:

    PYTHON64ROOT = Vapor3rdParty\Python-2.7.12-64
    QTDIR64 = vaporwin64deps\Qt\4.8.7
    QTDIR = %QTDIR64%
    VAPOR_WIN64_DEBUG_LIB_PATH = Vapor3rdParty\debugLib64
    VAPOR_WIN64_RELEASE_LIB_PATH = Vapor3rdParty\releaseLib64
    IDL_INC_PATH = Vapor3rdParty\IDLexternal\include
    VAPORDEPS_INC_DIR = Vapor3rdParty\include
    Path = [Path];vaporwin**deps\vapordlls
    VAPOR_HOME = [root of source tree]

When debugging or testing **VAPOR** using the source code build, the PATH should include either vaporwin64deps\vapordlls.  VAPOR_HOME should be set to the root of the source tree.

Prior to execution the directory for loading **VAPOR** preferences must be specified.  This can be set by setting the HOME environment variable, or the VAPOR_PREFS_DIR environment variable to the absolute path of the directory where preferences will be saved.

Once these variables have been set, load the Visual Studio 2010 project from the vapor source tree at make/win32/common/common.sln .  You can build either debug or release.
