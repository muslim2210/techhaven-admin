import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  category: CategoryType[];
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
  category,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CategoryType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      category.find((collection) => collection._id === id)
    ) as CategoryType[];
  }

  const selectTables = category.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            {selectTables.map((collection) => (
              <CommandItem
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
