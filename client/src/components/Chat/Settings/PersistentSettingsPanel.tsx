import React, { useState, useMemo } from 'react';
import { Settings2, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useRecoilState } from 'recoil';
import {
  Button,
  HoverCard,
  HoverCardTrigger,
  ResizablePanel,
  ResizableHandle,
  TooltipAnchor,
} from '@librechat/client';
import { EModelEndpoint, isParamEndpoint } from 'librechat-data-provider';
import { EndpointSettings, AlternativeSettings } from '~/components/Endpoints';
import { useSetIndexOptions, useLocalize } from '~/hooks';
import { useChatContext } from '~/Providers';
import { useGetEndpointsQuery } from '~/data-provider';
import { getEndpointField } from '~/utils';
import { cn } from '~/utils';
import store from '~/store';

interface PersistentSettingsPanelProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  className?: string;
}

export default function PersistentSettingsPanel({
  isVisible,
  setIsVisible,
  className,
}: PersistentSettingsPanelProps) {
  const localize = useLocalize();
  const { conversation } = useChatContext();
  const { setOption } = useSetIndexOptions();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  
  const { endpoint, conversationId } = conversation ?? {};
  
  const noSettings = useMemo<{ [key: string]: boolean }>(
    () => ({
      [EModelEndpoint.chatGPTBrowser]: true,
    }),
    [conversationId],
  );

  const endpointType = getEndpointField(endpointsConfig, endpoint, 'type');
  const paramEndpoint = isParamEndpoint(endpoint, endpointType);
  const hasSettings = endpoint && !noSettings[endpoint] && paramEndpoint === false;

  if (!hasSettings || !conversation) {
    return null;
  }

  const togglePanel = () => setIsVisible(!isVisible);

  if (!isVisible) {
    return (
      <div className="relative">
        {/* Toggle Button - Show Settings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-full z-10">
          <TooltipAnchor
            id="persistent-settings-toggle"
            aria-label={localize('com_ui_show_settings') || 'Show Settings'}
            description={localize('com_ui_show_settings') || 'Show Settings'}
            tabIndex={0}
            role="button"
            onClick={togglePanel}
            data-testid="persistent-settings-toggle"
            className={cn(
              'flex items-center justify-center w-8 h-12 bg-surface-primary border border-border-light',
              'text-text-primary transition-all ease-in-out hover:bg-surface-tertiary',
              'shadow-lg rounded-l-md'
            )}
          >
            <Settings2 size={16} aria-label="Show Settings" />
          </TooltipAnchor>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-80 h-full border-l border-border-light bg-background shadow-xl', className)}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-light bg-surface-primary">
          <div className="flex items-center gap-2">
            <Settings2 size={18} />
            <h3 className="font-medium text-text-primary">
              {localize('com_ui_model_parameters') || 'Model Parameters'}
            </h3>
          </div>
          <Button
            type="button"
            onClick={togglePanel}
            className="h-8 w-8 p-0 bg-transparent hover:bg-surface-tertiary text-text-secondary hover:text-text-primary"
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <EndpointSettings
              className="[&::-webkit-scrollbar]:w-2"
              conversation={conversation}
              setOption={setOption}
            />
            <AlternativeSettings 
              conversation={conversation} 
              setOption={setOption} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-light bg-surface-primary">
          <div className="text-xs text-text-secondary">
            Settings saved automatically
          </div>
        </div>
      </div>
    </div>
  );
}