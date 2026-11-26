#!/usr/bin/env python3
"""
Parametric Turbine Rotor Assembly Generator for FreeCAD (`freecadcmd`) + Pure-Python Dry-Run Validator.
Usage (dry-run validation):
  python3 freecad_turbine_blade.py --dry-run --blades 12 --outer-radius 85
Usage (FreeCAD headless STEP/STL export):
  freecadcmd freecad_turbine_blade.py --blades 12 --outer-radius 85 --out turbine_rotor.step
"""
import argparse
import json
import math
import sys


def compute_rotor_spec(blades: int, hub_radius: float, outer_radius: float, hub_height: float, pitch_deg: float) -> dict:
    if blades < 3 or outer_radius <= hub_radius + 5:
        raise ValueError("Invalid rotor geometry: require blades >= 3 and outer_radius > hub_radius + 5mm")
    blade_length = outer_radius - hub_radius
    blade_chord = min(hub_height * 0.72, (2 * math.pi * hub_radius / blades) * 0.78)
    blade_thickness = max(1.6, blade_chord * 0.14)
    angles = [round((360.0 / blades) * i, 2) for i in range(blades)]
    return {
        "blades": blades,
        "hub_radius_mm": hub_radius,
        "outer_radius_mm": outer_radius,
        "hub_height_mm": hub_height,
        "blade_length_mm": round(blade_length, 2),
        "blade_chord_mm": round(blade_chord, 2),
        "blade_thickness_mm": round(blade_thickness, 2),
        "pitch_deg": pitch_deg,
        "angular_positions_deg": angles,
    }


def export_freecad(spec: dict, out_path: str) -> None:
    import FreeCAD  # type: ignore
    import Part  # type: ignore

    doc = FreeCAD.newDocument("ParametricTurbine")
    hub = Part.makeCylinder(spec["hub_radius_mm"], spec["hub_height_mm"])
    bore = Part.makeCylinder(spec["hub_radius_mm"] * 0.38, spec["hub_height_mm"] + 2.0, FreeCAD.Vector(0, 0, -1))
    rotor = hub.cut(bore)

    for angle in spec["angular_positions_deg"]:
        blade = Part.makeBox(
            spec["blade_length_mm"] + 2.0,
            spec["blade_thickness_mm"],
            spec["blade_chord_mm"],
            FreeCAD.Vector(spec["hub_radius_mm"] - 2.0, -spec["blade_thickness_mm"] / 2.0, (spec["hub_height_mm"] - spec["blade_chord_mm"]) / 2.0),
        )
        blade.rotate(
            FreeCAD.Vector(spec["hub_radius_mm"], 0, spec["hub_height_mm"] / 2.0),
            FreeCAD.Vector(1, 0, 0),
            spec["pitch_deg"],
        )
        blade.rotate(FreeCAD.Vector(0, 0, 0), FreeCAD.Vector(0, 0, 1), angle)
        rotor = rotor.fuse(blade)

    obj = doc.addObject("Part::Feature", "TurbineRotor")
    obj.Shape = rotor
    doc.recompute()
    if out_path.lower().endswith(".stl"):
        rotor.exportStl(out_path)
    else:
        Part.export([obj], out_path)
    print(f"Exported parametric rotor to {out_path}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Parametric turbine rotor generator for FreeCAD.")
    parser.add_argument("--blades", type=int, default=12)
    parser.add_argument("--hub-radius", type=float, default=28.0)
    parser.add_argument("--outer-radius", type=float, default=85.0)
    parser.add_argument("--hub-height", type=float, default=32.0)
    parser.add_argument("--pitch-deg", type=float, default=28.0)
    parser.add_argument("--out", default="turbine_rotor.step")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    spec = compute_rotor_spec(args.blades, args.hub_radius, args.outer_radius, args.hub_height, args.pitch_deg)
    print(json.dumps(spec, indent=2))
    if not args.dry_run:
        export_freecad(spec, args.out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
