import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

const handleJSEncrypt = (data) => {
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1oPV6JCZUNzro3heK3II
XmRp9LtFZvzzXBJK8l3U24tIZayZJ/ddcKf0jDR1tRW3mYnWRIuhF60kyOR5iDX3
qzosZkegnQ5L82JN0rq6HDtsdfLmB+pEfNkxTM8f5puE+RJeB80FTq0GpCj3sKs5
qCPvTqH2RHDIT0WcXT7DDLOjwAJJHoCVfvBqmMptHir1a1izUlIPXHPYuZ5EMpLu
9KEa5nEVVN+urW4uhYAgjMf/p+8ElcqkpdFNNHFsglSzPyt0cHtwQka0FjQuiX8x
+XsrTOQHSOHz+NG6MUA2OB2Ay7YgtAq4JxbP0J6896QGv1wYwQTG74QWBy1NuolI
owIDAQAB
-----END PUBLIC KEY-----`;

  const sessionKeyBytes = crypto.getRandomValues(new Uint8Array(32));

  const sessionKeyHex = Array.from(sessionKeyBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const iv = CryptoJS.lib.WordArray.random(16);

  const encryptedPayload = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Hex.parse(sessionKeyHex),
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  ).toString();

  const rsa = new JSEncrypt();
  rsa.setPublicKey(publicKey);

  const encryptedKey = rsa.encrypt(sessionKeyHex);

  if (!encryptedKey) {
    throw new Error("RSA encryption failed");
  }
  return {
    key: encryptedKey,
    payload: encryptedPayload,
    iv: iv.toString(CryptoJS.enc.Hex),
  };
};

export default handleJSEncrypt;
