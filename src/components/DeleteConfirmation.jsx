import { Button } from './ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from './ui/dialog';

export default function DeleteConfirmation({
  alertTitle,
  handleClick,
  isOpen,
  onClose,
}) {
  return (
    <DialogRoot
      role="alertdialog"
      open={isOpen}
      onOpenChange={onClose}
      closeOnInteractOutside
    >
      <DialogContent>
        <DialogHeader fontSize="lg" fontWeight="bold">
          {alertTitle}
        </DialogHeader>

        <DialogBody>Are you sure? You can&apos;t undo this action.</DialogBody>

        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorPalette="red" onClick={handleClick} ml={3}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
