import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactDialog = ({ isOpen, onClose }: ContactDialogProps) => {
  const { t } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{t('contact.title')}</DialogTitle>
          <DialogDescription>
            {t('contact.description')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <a 
            href="tel:+66661249356" 
            className="text-2xl font-semibold text-primary hover:underline"
          >
            +66 66 124 9356
          </a>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose}>
            {t('contact.close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;