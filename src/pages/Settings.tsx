export function Settings() {
  return (
    <section className="space-y-7">
      <div>
        <p className="page-eyebrow">Workspace configuration</p>
        <h2 className="page-title">Settings</h2>
        <p className="page-description">
          Local workflow preferences before AWS services are connected.
        </p>
      </div>

      <div className="surface-panel grid md:grid-cols-[220px_1fr]">
        <div className="border-b border-[#e5e1d8] bg-[#eeebe4] p-5 md:border-b-0 md:border-r">
          <p className="surface-title">Local environment</p>
          <p className="mt-3 text-sm leading-6 text-[#62706d]">
            The current workspace uses mock documents and browser state.
          </p>
        </div>

        <div className="p-5">
          <p className="text-sm font-semibold text-[#253532]">
            AWS connection settings
          </p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#62706d]">
            API endpoints, authentication, and storage configuration will be
            added when the local document workflow is complete.
          </p>
        </div>
      </div>
    </section>
  );
}
