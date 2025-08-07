import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion-react-native";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function AuthScreen() {
  const {
    data: account,
    logout,
    login,
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const { client, signArb } = useAbstraxionSigningClient();

  const [signArbResponse, setSignArbResponse] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loadingInstantiate, setLoadingInstantiate] = useState(false);

  async function handleInstantiate() {
    setLoadingInstantiate(true);
    try {
      const msg = {
        type_urls: ["/cosmwasm.wasm.v1.MsgInstantiateContract"],
        grant_configs: [
          {
            description: "Ability to instantiate contracts",
            optional: false,
            authorization: {
              type_url: "/cosmos.authz.v1beta1.GenericAuthorization",
              value: "CigvY29zbXdhc20ud2FzbS52MS5Nc2dJbnN0YW50aWF0ZUNvbnRyYWN0",
            },
          },
        ],
        fee_config: {
          description: "Sample fee config for testnet-2",
          allowance: {
            type_url: "/cosmos.feegrant.v1beta1.BasicAllowance",
            value: "Cg8KBXV4aW9uEgY1MDAwMDA=",
          },
        },
        admin: account.bech32Address,
      };

      const instantiateRes = await client?.instantiate(
        account.bech32Address,
        33,
        msg,
        "instantiate on expo demo",
        "auto"
      );

      if (!instantiateRes) throw new Error("Instantiate failed.");

      setTxHash(instantiateRes.transactionHash);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoadingInstantiate(false);
    }
  }

  async function handleSign(): Promise<void> {
    if (client?.granteeAddress) {
      const response = await signArb?.(
        client.granteeAddress,
        "abstraxion challenge"
      );
      if (response) setSignArbResponse(response);
    }
  }

  function handleLogout() {
    logout();
    setSignArbResponse("");
    setTxHash("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication</Text>

      {isConnected ? (
        <>
          <TouchableOpacity
            onPress={handleInstantiate}
            style={styles.button}
            disabled={loadingInstantiate}
          >
            <Text style={styles.buttonText}>
              {loadingInstantiate ? "Loading..." : "Sample Instantiate"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSign} style={styles.button}>
            <Text style={styles.buttonText}>Sign Arb</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={login}
          style={[
            styles.button,
            isConnecting && styles.disabledButton
          ]}
          disabled={isConnecting}
        >
          <Text style={styles.buttonText}>
            {isConnecting ? "Connecting..." : "Login"}
          </Text>
        </TouchableOpacity>
      )}

      {(signArbResponse || txHash) && (
        <View style={styles.card}>
          {signArbResponse && <Text style={styles.responseText}>{signArbResponse}</Text>}
          {txHash && <Text style={styles.responseText}>{txHash}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 32,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    width: "90%",
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
    width: "90%",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  responseText: {
    color: Colors.darkGray,
    fontSize: 14,
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
});
