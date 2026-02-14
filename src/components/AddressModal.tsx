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
      <DialogContent className="sm:max-w-md [&>button]:h-9 [&>button]:w-9 [&>button]:p-0 [&>button]:inline-flex [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:right-2 [&>button]:top-2 [&>button]:bg-black/45 [&>button]:border-0 [&>button]:shadow-sm [&>button]:opacity-95 [&>button]:transition-colors [&>button:hover]:bg-red-500/30 [&>button:active]:bg-red-500/45 [&>button]:focus:outline-none [&>button]:focus-visible:ring-0 [&>button>svg]:h-[18px] [&>button>svg]:w-[18px] [&>button>svg]:text-white [&>button>svg]:stroke-[2.5]">
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
            className="min-h-[100px] resize-none"
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
