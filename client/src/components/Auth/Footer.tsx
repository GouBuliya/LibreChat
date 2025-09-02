
function Footer({ startupConfig }: { startupConfig: any }) {
  if (!startupConfig?.customFooter) {
    return null;
  }

  return (
    <div className="text-center text-sm text-gray-600 dark:text-gray-400 py-4">
      {startupConfig.customFooter}
    </div>
  );
}

export default Footer;
