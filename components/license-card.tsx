import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LicenseData, LicenseType } from "@/store/slice/license.slice";

// Mock data for demonstration

// User license data
interface LicenseCardProps {
  license_type: LicenseType[];
  license_data: LicenseData[];
}

export default function LicenseCard({
  license_type,
  license_data,
}: LicenseCardProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full mx-auto space-y-4">
      {license_type.map((licenseType, index) => {
        const userLicense = license_data.find(
          (ul) => ul.license_type_id === licenseType.license_type_id
        );

        return (
          <Card
            key={index}
            className={`${
              !userLicense ? "border-dashed border-2 border-gray-300" : ""
            }`}
          >
            {userLicense ? (
              <>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>{licenseType.license_name}</CardTitle>
                  <button
                    onClick={() =>
                      setEditIndex(editIndex === index ? null : index)
                    }
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit3 className="h-6 w-6" />
                    <span className="sr-only">
                      Edit {licenseType.license_name} License
                    </span>
                  </button>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                  <p>
                    Expiry Date:{" "}
                    {format(new Date(userLicense.expiry_date), "PPP")}
                  </p>
                  {/* <img src={userLicense.image_url} alt="License Evidence" className="w-20 h-20 mt-2" /> */}
                </CardContent>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: editIndex === index ? "auto" : 0,
                    opacity: editIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {editIndex === index && (
                    <CardContent>
                      <form>
                        <div className="mb-4">
                          <label
                            htmlFor={`expiry-date-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Expiry Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor={`license-number-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            License Number
                          </label>
                          <input
                            type="text"
                            id={`license-number-${index}`}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor={`evidence-upload-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Upload Evidence
                          </label>
                          <input
                            type="file"
                            id={`evidence-upload-${index}`}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                          Save
                        </button>
                      </form>
                    </CardContent>
                  )}
                </motion.div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-32">
                <button className="text-gray-400 hover:text-gray-600 transition-colors mt-6">
                  <PlusCircle className="h-12 w-12" />
                  <span className="sr-only">
                    Add {licenseType.license_name} License
                  </span>
                </button>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
