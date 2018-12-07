Getting Started with VAPOR
==========================

The VAPOR user interface enables scientists to visualize both large- and small-scale features of time-varying data sets. Its interactive 3D visualization environment runs on most UNIX, Mac OS X, and Windows systems that are equipped with modern 3D graphics cards. We provide binary installers that work on all supported platforms and we strongly recommend using a binary distribution for your installation.

The documentation and demonstration below outline and illustrate some basic steps to help you get started using VAPOR. It is intended for general use but also contains some information specific to NCAR/UCAR systems. We also provide example data sets, usage guides, and reference material on these [Documentation](https://aNiemack.github.io/docs) and Training pages.

Installing VAPOR
----------------

   1. Read the Release Notes for the current version.
   2. Download the appropriate install package for your platform. (Login required.)
   3. Follow the installation instructions for your platform.

>Note for NCAR/UCAR users
>
>VAPOR is already available on the Geyser and Caldera visualization and analysis clusters. See the CISL documentation for >those systems as well as these instructions for starting TurboVNC.
>
>The sample data files used in the visualization example below are in /glade/u/sampledata/vapor/WRF/Katrina and also available from this ftp site.

Preparing data
--------------

Prepare your data set as described in VAPOR Data Preparation. This is optional with some model outputs such as WRF-ARW, MOM4, CAM, and GRIMs. Output from these models can be visualized directly, with no data preparation. Some example data sets are provided here.

You will want to have your data in place in a directory of your own before you start the VAPOR interface.

Getting help
------------

Help is available a number of ways:

   * See the Documentation and Support menus above.
   * Tool tips, which appear when you hold your mouse over a button or input field.
   * Context-sensitive help within VAPOR. Select Explain This from the Help menu (Figure 1), then click the feature you would like to have explained.

![alt text](/aNiemack.github.io/vapor_explain.png "vapor help")

Figure 1 - Click to see an image of the VAPOR screen.

Starting VAPOR
--------------

Launch the VAPOR GUI by following the procedures for your own platform. (Starting it with vglrun, as in this example, is specific for NCAR/UCAR users running on the Geyser or Caldera clusters.)

vglrun vaporgui

 
![alt text](/aNiemack.github.io/2.png)

Figure 2 - Click to enlarge.

 

With the VAPOR interface open (Figure 2), you can load your data set and proceed.

The following visualization example demonstrates some basic VAPOR functions.

Visualization example using WRF-ARW
-----------------------------------

This documentation will be most helpful if you refer to it after starting VAPOR as described above, then work through the example to create a basic visualization.
Steps

1.    [Load your data set](#loading)
2.    Stretch the scene
3.    Display an image
4.    Define a variable
5.    Edit the transfer function
6.    Capture an animation

<h3 id="loading">Loading a data set</h3>

This example assumes that you have copied these sample [WRF-ARW data files](ftp://ftp.ucar.edu/vapor/data/Katrina) from the ftp site to a directory on your own system.

Substitute your own directory name and data set as appropriate.

![alt text](/aNiemack.github.io/3.png)

Figure 3 - Click to enlarge.

 

#### Procedure:

1.    From the Data menu at the top of the VAPOR window, click Import data into current session, then WRF-ARW.
2.    Use the Look in dropdown to locate your file. (Figure 3)
3.    Select all of the files you will be visualizing and click Open.
4.    A flat rectangle will appear on the screen to indicate the bounds of the current region. Stretch the scene.

Once the scene is established, you can manipulate it as follows.

  *  Rotate the scene by clicking and dragging with your left mouse button.
  * Zoom in and out by dragging your right mouse button up and down.
  * Move it horizontally or vertically by dragging with your middle mouse button.

### Stretching a scene

You may need to adjust the “scene stretch” to visualize 3D data effectively. For example, if the box is 1,000 km long and 1,000 km wide but only 20 km high, the scene will be quite flat in the Z dimension.

![alt text](/aNiemack.github.io/4.png)

Figure 4 - Click to see the whole panel.

 

#### Procedure:

1. From the Edit menu at the top of your VAPOR window, click Edit Visualizer Features. The editor will open in a new window. (Figure 4)
2.    Enter 50 for scene stretch factor Z.
3.    Click OK at the top of the panel.

The box in the scene will be taller, as will the portion of the terrain in the scene.

### Displaying images

Display a background image to help you see the geographic area associated with the data you are visualizing.

![alt text](/aNiemack.github.io/5.png)

Figure 5 - Click to enlarge.

 

#### Procedure:

1.    Select the Image tab.
2.    Click Select Installed Image, then choose the background image you want to use – BigBlueMarble.tiff, for example. (If you retrieved a different terrain image, choose Select Image File instead and locate that image.)
3.    Check Apply to terrain.
4.    Check the View box next to Instance: 1. A small portion of the image will be visible.
5.    Select Image from the Modes dropdown menu.
6.    Right click the red image handles (Figure 5) and drag them to expand the portion of the image that will be visible.
7.    Uncheck and then recheck the View box next to Instance: 1.

### Defining and selecting a variable to visualize

You can either select a variable to visualize from the Variable dropdown list or define a new variable.

For this demonstration, define a variable and add it to the dropdown list as follows.

![alt text](/aNiemack.github.io/6.png)

Figure 6 - Click to see the whole panel.

 

#### Procedure:

1.    From the Edit menu, click Edit Python program defining a new variable.
2.    Click the checkboxes for variables U, V, and W in the Input 3D Variables box. (Figure 6)
3.    Click Add 3D variable.
4.    Name the new variable "wind" and click OK.
5.    In the input field, type: wind = sqrt(U*U+V*V+W*W)
6.    Click Test to confirm that you did that correctly. (If the result is not "Successful Test," double-check the previous steps.)
7.    Click Apply after conducting a successful test.

See Using Python with VAPOR for related information.

After defining the new variable, take these additional steps:

 1.   Click the DVR tab.
 2.   Select the wind variable from the Variable dropdown list.
 3.   Check the View box next to Instance: 1.

### Editing the transfer function

The **Transfer Function** Editor controls colors and opacity in the volume rendering of your data.

![alt text](/aNiemack.github.io/7.png)

Figure 7 - Click to enlarge.

 

#### Procedure:

1.    Select the DVR tab. (Figure 7)
2.   Choose your new wind variable from the Variable menu. 
3.    Click Fit Data, then Fit to View, then Histo.
4.    Click Load Installed TF button (near the bottom of the control panel) and select pre-installed transfer function reversed.vtf. This reverses the color map so larger values (greater wind speeds, for example) are red and smaller values are violet. 
5.    Select the variable interval to be mapped to color and opacity. For example, drag the left end of the arrow at the top of the Transfer Function Editor (Figure 8) to the right about one-third (1/3) of the way to exclude low wind values.
6.    Reduce the opacity at the two middle control points by dragging them downward to help you see the higher wind values inside the hurricane.
7.    Move the opacity slider down until you can see the most useful representation of your data.  
8.    Click Fit to View and Histo.

![alt text](/aNiemack.github.io/8.png)

Figure 8 - Click for another view of the Transfer Function Editor.

### Capturing an animation sequence

Before animating and capturing the visualization, you may want to further define or restrict the region you’re observing by rotating the scene, zooming in or out, or changing the size of the region box.

Then, use the VAPOR animation toolbar or “player” to animate and capture a sequence of the visualization. (Figure 9)

![alt text](/aNiemack.github.io/9.png)

Figure 9 - Click to enlarge.

 

#### Procedure:

To capture the animation sequence, proceed as follows.

1.    From the Mode menu near the top of your VAPOR window, select Navigation.
2.    Set the current time step to 1.
3.    Zoom in to get a close look at the hurricane
4.    From the Capture menu at the top of your VAPOR window, select Begin image capture sequence.
5.    Choose a name for the jpeg files to be captured — "KatrinaEye.jpg,” for example.
6.    Click the Play Forward button on the animation toolbar, and watch the animation proceed to its completion.
7.    From the Capture menu, select End image capture sequence.

VAPOR saves a series of jpeg files to disk. You can convert them into a movie file using any of various utilities such as QuickTime Pro and FFmpeg.
