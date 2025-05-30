import { User } from "@/domains/shared/types";
import { UserAvatar } from "./UserAvatar";
import { useState } from "react";

type Props = {
  users: Pick<User, "displayName" | "id">[];
  onSelect: (selectedUserIds: string[]) => void;
};

export function UserSelector({ users, onSelect }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const addToSelected = (id: string) => {
    const isDuplicate = selected.includes(id);
    let updatedSelectedIds = [];
    if (isDuplicate) {
      updatedSelectedIds = selected.filter((u) => u !== id);
    } else {
      updatedSelectedIds = [...selected, id];
    }
    setSelected(updatedSelectedIds);
    onSelect(updatedSelectedIds);
  };

  return (
    <>
      {users.map((user) => (
        <UserAvatar
          key={user.id}
          isSelected={selected.includes(user.id)}
          onTap={addToSelected}
          showName
          nameLocation="bottom"
          user={user}
          id={user.id}
        />
      ))}
    </>
  );
}
