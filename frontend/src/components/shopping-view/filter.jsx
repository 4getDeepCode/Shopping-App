import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Fragment } from "react";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="relative rounded-xl border border-gray-800 bg-gray-900 backdrop-blur-xl shadow-xl shadow-black/40 p-1">

      {/* Yellow Glow Behind Panel */}
      <div className="absolute inset-0 bg-yellow-500/5 blur-3xl pointer-events-none rounded-xl"></div>

      {/* Filter Content */}
      <div className="relative rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-800 ">
          <h2 className="text-xl font-extrabold text-yellow-400 tracking-wide drop-shadow">
            Filters
          </h2>
        </div>

        {/* FILTER SECTIONS */}
        <div className="p-4 space-y-6">
          {Object.keys(filterOptions).map((keyItem, i) => (
            <Fragment key={keyItem}>
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">
                  {keyItem}
                </h3>
                <div className="grid gap-3">
                  {filterOptions[keyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-yellow-400 transition"
                    >
                      <Checkbox
                        checked={filters?.[keyItem]?.includes(option.id)}
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                        className="border-white data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>

              {/* Separator except last */}
              {i !== Object.keys(filterOptions).length - 1 && (
                <Separator className="bg-gray-800" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
