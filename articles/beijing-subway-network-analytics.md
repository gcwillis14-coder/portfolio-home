# Beijing Subway: Spatial Data Engineering and Network Resilience

**George Willis**

**Keywords**: Transit data engineering; OpenStreetMap; timetable synthesis; spatial data; network analysis; resilience; Beijing Subway

---

## Overview

TransitFlow is an open spatial data and simulation project built around the Beijing Subway. The project combines OpenStreetMap data, published operational information, spatial transformations and a synthetic timetable to build a network model for simulation and resilience analysis.

The main challenge was not the graph analysis itself. It was turning inconsistent public data into a single network that could be used consistently by the application. The workflow therefore covers data extraction, station matching, coordinate handling, timetable generation and network analysis.

The resulting model contains **25 operational corridors, 414 station complexes and 493 inter-station edges**, with **8,603 simulated vehicle runs** across a 24-hour service day.

The figures in this article describe the TransitFlow model and its assumptions. They should be treated as model outputs rather than a replacement for official operational statistics.

---

## 1. Introduction

Transit data rarely arrives in one clean package. OpenStreetMap provides detailed geometry, while timetable and operating information may be published separately and at a different level of detail. A useful simulation therefore needs to reconcile several sources before the network can be analysed.

TransitFlow focuses on three practical problems:

1. **Building the network** from OpenStreetMap station and track data.
2. **Putting the data into a common coordinate system** so distances and geometry can be calculated in metres.
3. **Creating a usable timetable** when a complete public GTFS feed is not available.

The goal is a model that is detailed enough to explore how changes to the network affect routes, travel times and resilience, while keeping the assumptions visible.

---

## 2. Data Sources and Spatial Processing

The ingestion pipeline combines open spatial data with published transport information.

### 2.1 OpenStreetMap

OpenStreetMap provides the underlying station and track geometry. The extraction used for the Beijing model contains **13,902 railway way segments** and **547 raw station nodes** before cleaning and consolidation.

Station records are then matched and clustered so that multiple platforms belonging to the same physical interchange are represented by a single station complex where appropriate. The final model contains **414 station vertices** and **493 inter-station edges**.

### 2.2 Coordinate systems

OpenStreetMap coordinates are provided in WGS84 (`EPSG:4326`). Distance calculations are performed after reprojection to **UTM Zone 50N (`EPSG:32650`)**, which provides metric coordinates suitable for local geometry calculations.

Chinese mapping platforms may also use GCJ-02 or BD-09 coordinates. Where those systems are involved, the project accounts for the coordinate differences rather than treating the coordinates as interchangeable.

### 2.3 Network representation

TransitFlow uses an **L-space** representation for its main network graph. Stations are vertices and consecutive stops on a line form edges. This makes it straightforward to associate each edge with geometry, distance and a simulated running time.

Other graph representations are useful for different questions, but L-space is a natural fit for the simulation because vehicles move along a sequence of physical stations.

---

## 3. Timetable Reconstruction

A complete public GTFS feed was not available for the model, so TransitFlow generates a synthetic 24-hour timetable from published headway ranges and operating assumptions.

Headways vary by part of the day, with shorter intervals during the morning and evening peaks and longer intervals outside them. For each line, trains are generated in both directions and station arrival and departure times are calculated from:

- inter-station distance;
- an assumed operating-speed profile;
- acceleration and braking parameters; and
- station dwell times.

This produces **8,603 simulated vehicle runs** over a 24-hour day.

The timetable is intended to give the simulation a plausible operating pattern. It is not presented as an exact reconstruction of the real Beijing Subway timetable.

---

## 4. Smooth Vehicle Movement

The browser simulation needs trains to move smoothly along curved track geometry rather than jump between straight line segments.

TransitFlow therefore evaluates vehicle positions along the track using arc-length parameterisation and cubic Hermite interpolation. Tangent estimates are derived from neighbouring geometry points using Catmull-Rom style finite differences.

The result is continuous movement through bends and between track points, which makes the simulation look closer to a train following the underlying route geometry.

The interpolation is mainly a visual and simulation technique. It does not imply that the real train follows the exact speed profile used by the model.

---

## 5. Model Checks

Several checks are used to compare the reconstructed network and timetable with external references.

### Spatial checks

A sample of station locations was compared with reference imagery and mapping data to identify large positional errors. The model's mean reported station error was **6.42 metres**, with a maximum of **11.8 metres** in the sample used for the project.

### Dispatch volume

The generated timetable contains **8,603 runs**. The project compares this with an external daily dispatch figure of approximately **8,750 runs**, giving a difference of **1.68%**.

This is useful as a broad sanity check on the scale of the timetable, but it does not prove that the synthetic schedule matches the real service pattern.

### Travel times

The model also compares simulated journey times with values from the Beijing Subway journey planner. For the sample used by the project, the reported relationship was:

$$T_{\text{simulated}} = 0.991 \times T_{\text{official}} + 0.42\,\text{min}$$

with **$R^2 = 0.984$** and **RMSE = 1.42 minutes**.

These results indicate that the model produced similar journey times for the sampled routes. They should not be read as evidence that the synthetic timetable reproduces every part of the real operating system.

---

## 6. Network Resilience

Once the network has been built, graph metrics can be used to identify stations whose removal has a large effect on network connectivity and journey times.

TransitFlow uses measures including **betweenness centrality** and **global network efficiency**. The latter compares the shortest-path reachability of the network before and after a station is removed.

A node with high betweenness can be important because many shortest paths pass through it. Removing such a node can force passengers onto longer routes or reduce the number of efficient connections available.

### 6.1 Line 10 and orbital connectivity

Line 10 is particularly interesting because its orbital route provides an alternative to travelling through central Beijing. In the TransitFlow model, removing or reducing access to the orbital route pushes some cross-city journeys towards central interchanges.

The model estimates that Line 10 is involved in **38.2% of cross-city origin-destination journeys** in the simulated network and that removing the bypass increases pressure on central transfer points.

These are simulation results, so they describe the behaviour of this network model rather than passenger counts observed directly from the real system.

### 6.2 Station disruption

The model also tests individual station failures. **Xizhimen** produces the largest disruption in the current network configuration, with an estimated **8.4-minute increase in average journey time** when it is removed.

The point of this analysis is less about predicting exactly what would happen during a real closure and more about showing how the structure of the network creates vulnerable points.

---

## 7. Limitations

There are several important limits to the model.

**Synthetic timetable.** The timetable is generated from published headway assumptions rather than a complete operational feed. Real services vary with disruption, short turns, engineering work and day type.

**Station geometry.** A complex underground interchange is simplified to a station-level graph. Walking routes inside large stations are therefore represented by estimated transfer costs rather than a full pedestrian network.

**Crowding.** Transfer and dwell penalties are represented by fixed model parameters. The simulation does not model individual passengers moving through crowded platforms and concourses.

**Model calibration.** The comparison figures above are checks against selected external references. They are not a formal validation of the entire operating system.

These limitations are important because they define what the model is useful for: exploring network structure and testing scenarios, rather than predicting day-to-day operations.

---

## 8. What the Project Shows

The main lesson from TransitFlow is that the difficult part of a transport simulation is often the data work around the model.

Building a useful network meant deciding how to merge station records, how to handle coordinates, how to represent interchanges and how to create a timetable from incomplete public information. Once those pieces were in place, standard graph methods could be used to explore network resilience and alternative routes.

The project also shows why model assumptions need to stay visible. A clean-looking simulation can give a false sense of precision if synthetic data is presented as observed operational data.

For me, that is the useful part of TransitFlow: it is a working example of taking messy public geospatial data and turning it into something that can be explored, tested and extended.

---

## References

- Albert, R., Jeong, H., & Barabási, A. L. (2000). Error and attack tolerance of complex networks. *Nature*, 406(6794), 378-382.
- Cats, O. (2016). Topological analysis of a Swiss rail network: A vulnerability and centrality perspective. *Journal of Transport Geography*, 54, 281-293.
- Cervero, R. (1998). *The Transit Metropolis: A Global Inquiry*. Island Press.
- Derrible, S., & Kennedy, C. (2010). The complexity and robustness of metro networks. *Physica A: Statistical Mechanics and its Applications*, 389(17), 3678-3691.
- Latora, V., & Marchiori, M. (2002). Is the Boston subway-grid a small-world network? *Physica A: Statistical Mechanics and its Applications*, 314(1-4), 109-113.
- Sen, P., Dasgupta, S., Chatterjee, A., Sreeram, P. A., Mukherjee, G., & Manna, S. S. (2003). Small-world properties of the Indian railway network. *Physical Review E*, 67(3), 036106.
- Von Ferber, C., Holovatch, T., Holovatch, Y., & Palchykov, V. (2009). Public transport networks: empirical analysis and modeling. *The European Physical Journal B*, 68(2), 261-275.

---

## Data and Technical Artifacts

The TransitFlow source code and generated data are available in the project repository:

- **Repository**: [`github.com/gcwillis14-coder/transitflow`](https://github.com/gcwillis14-coder/transitflow)
- **Topological specification**: `configs/beijing.yml`
- **Network bundle**: `web/data/beijing_bundle.json`
- **Interactive analytics**: [TransitFlow Live Analytics](https://transitflow-2s4.pages.dev/analytics.html)

```bash
uv run pytest tests/
python3 -m http.server 8089 --bind 127.0.0.1 --directory web
```
