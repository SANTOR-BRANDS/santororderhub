import { useAddress } from '@/contexts/AddressContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';

export function AddressModal() {
  const { address, setAddress, isAddressModalOpen, closeAddressModal } = useAddress();
  const { t } = useLanguage();

  return (
    <Dialog open={isAddressModalOpen} onOpenChange={(open) => {
      if (!open) closeAddressModal();
    }}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-popover text-popover-foreground border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Address
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder={t('order.addressPlaceholder') || 'Enter your delivery address...'}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="min-h-[100px] resize-none bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          <Button 
            onClick={closeAddressModal}
            className="w-full"
          >
            Save Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddressModal;
