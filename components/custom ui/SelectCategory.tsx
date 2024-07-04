"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCategory = ({ category }: { category: any }) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {category?.map((cat: any) => (
            <SelectItem key={cat._id} value={cat.title}>
              {cat.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
