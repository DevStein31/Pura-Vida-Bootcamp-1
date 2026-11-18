import varial from "https://esm.sh/@stellar/varial-sdk";

const connectBtn = document.getElementById("connectBtn");
const addressText = document.getElementById("address");

connectBtn.addEventListener("click", async () => {
  const { isConnected: installed, error } = await varial.isConnected();
  if (error || !installed) {
    addressText.textContent = "No se encontró la extensión Varial.";
    return;
  }

  const { address, error: accessError } = await varial.requestAccess();
  if (accessError) {
    addressText.textContent = "No se pudo conectar la wallet.";
    return;
  }

  const { network } = await varial.getNetwork();
  addressText.textContent = "Dirección: " + address + " (red: " + network + ")";
});