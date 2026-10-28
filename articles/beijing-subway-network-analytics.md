# Modelling the Beijing metro

George Willis

The network data, simulated services and interchange indicators behind TransitFlow.

## A metro network to explore

TransitFlow is a personal project built around an interest in transport networks and maps. The Beijing example brings together station and track data, simulated services and a few ways to examine how the network connects.

The useful questions are fairly simple: which stations connect several lines, where do routes depend on a small number of interchanges, and how should those relationships appear on a map?

## Building the network

The data work starts with station and track geometry. Station names and line membership need to agree before the records can form a usable graph. In the browser demo, stations are nodes and neighbouring stops form connections.

The Python project and the prepared web demo are separate parts of the work. The public pages read a generated JSON bundle; they do not run the Python pipeline or collect new data when you open them.

## The moving trains

The timetable is generated, rather than taken from a live operating feed. The current web-data generator uses service windows with different headways, a 25-second dwell assumption and 110-second intervals between successive stops.

Those choices produce a modelled day that can be explored in the browser. They do not reproduce the actual timetable, train positions or passenger movements. The animation is a way to inspect the model, rather than evidence that its operating assumptions are correct.

## Connections and interchange indicators

The network analysis includes degree and betweenness centrality. Degree describes connections; betweenness measures how often a station lies on shortest paths through the graph.

The dashboard’s interchange panel displays precomputed indicators from the bundle. Its vulnerability score is a heuristic based on line count and centrality, not a recalculation of services during a station closure. It should not be read as a forecast of disruption or additional journey time.

## What the model leaves out

A station-level graph simplifies the walking routes within an interchange. The generated timetable does not capture service changes, crowding, short turns or day-to-day disruption.

Some network and operating figures are stored as reference values in the data generator. They need their own provenance before they can support comparisons with the real system. I’ve kept the description here to the mechanisms that can be traced in the current code.

The project is useful to me as a way to work through those choices and build something I can inspect. A working map is also a useful incentive to finish cleaning the data.

## Files behind the demo

The [project repository](https://github.com/gcwillis14-coder/transitflow) is private. These paths identify the source and published data for readers with access:

- `web/generate_24h_gtfs.py` prepares the browser dataset.
- `web/data/beijing_bundle.json` holds geometry, simulated trips and network indicators.
- `web/js/app.js` contains the simulation interface.
- `web/js/analytics.js` displays the network analysis.

[Explore the network](https://transitflow-2s4.pages.dev/analytics) · [Open simulation](https://transitflow-2s4.pages.dev/) · [Back to the projects](https://gcwillis14-coder.github.io/portfolio-home/portfolio/)
