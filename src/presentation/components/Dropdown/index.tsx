import clsx from "clsx";
import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

type DropdownProps = {
  anchorEl: React.ReactNode;
  children: React.ReactNode;
  positionX?: "right" | "left";
};

export function Dropdown({
  anchorEl,
  children,
  positionX = "left",
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((old) => !old);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="relative inline-block text-left">
        <div onClick={toggleOpen}>{anchorEl}</div>

        {open && (
          <div
            className={clsx(
              "absolute m-0.5 rounded-md bg-white px-2 py-1 opacity-100 shadow-lg",
              positionX === "left" ? "left-0" : "right-0",
            )}
          >
            {children}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
