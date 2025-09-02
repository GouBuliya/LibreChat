import { Menu } from 'lucide-react';
import { Button } from '@librechat/client';
import { useLocalize } from '~/hooks';

export default function Footer({ className }: { className?: string }) {
  const localize = useLocalize();

  return (
    <div className="relative w-full">
      {/* 移动端悬浮按钮：点击后打开右侧侧栏 */}
      <div className="pointer-events-none fixed bottom-20 right-4 z-20 block md:hidden">
        <Button
          size="icon"
          variant="outline"
          aria-label={localize('com_endpoint_open_menu')}
          className="pointer-events-auto rounded-full border border-border-light bg-surface-secondary p-3 shadow-md"
          onClick={() => window.dispatchEvent(new Event('open-right-panel'))}
        >
          <Menu className="size-5" />
        </Button>
      </div>

      {className ? <div className={className} role="contentinfo" /> : null}
    </div>
  );
}
