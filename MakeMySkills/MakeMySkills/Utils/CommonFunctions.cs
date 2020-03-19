using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace MakeMySkills.Utils
{
    public class CommonFunctions
    {
        public static string CustomEncryptString(string message, string passPhrase)
        {
            MD5CryptoServiceProvider hashProvider = null;
            TripleDESCryptoServiceProvider tdesAlgorithm = null;

            try
            {
                var utf8 = new UTF8Encoding();

                // Step 1. We hash the passphrase using MD5
                // We use the MD5 hash generator as the result is a 128 bit byte array
                // which is a valid length for the TripleDES encoder we use below

                hashProvider = new MD5CryptoServiceProvider();
                byte[] tdesKey = hashProvider.ComputeHash(utf8.GetBytes(passPhrase));

                // Step 2. Create a new TripleDESCryptoServiceProvider object
                tdesAlgorithm = new TripleDESCryptoServiceProvider
                {
                    Key = tdesKey,
                    Mode = CipherMode.ECB,
                    Padding = PaddingMode.PKCS7
                };

                // Step 3. Setup the encoder

                // Step 4. Convert the input string to a byte[]
                byte[] dataToEncrypt = utf8.GetBytes(message);

                // Step 5. Attempt to encrypt the string

                var encryptor = tdesAlgorithm.CreateEncryptor();
                byte[] results = encryptor.TransformFinalBlock(dataToEncrypt, 0, dataToEncrypt.Length);

                // Step 6. Return the encrypted string as a base64 encoded string
                return Convert.ToBase64String(results);
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
            }
            finally
            {
                // Clear the TripleDes and Hashprovider services of any sensitive information
                if (tdesAlgorithm != null) tdesAlgorithm.Clear();
                if (hashProvider != null) hashProvider.Clear();
            }

            return string.Empty;
        }

        public static string CustomDecryptString(string message, string passPhrase)
        {
            MD5CryptoServiceProvider hashProvider = null;
            TripleDESCryptoServiceProvider tdesAlgorithm = null;

            try
            {
                var utf8 = new UTF8Encoding();

                // Step 1. We hash the passphrase using MD5
                // We use the MD5 hash generator as the result is a 128 bit byte array
                // which is a valid length for the TripleDES encoder we use below

                hashProvider = new MD5CryptoServiceProvider();
                byte[] tdesKey = hashProvider.ComputeHash(utf8.GetBytes(passPhrase));

                // Step 2. Create a new TripleDESCryptoServiceProvider object
                tdesAlgorithm = new TripleDESCryptoServiceProvider
                {
                    Key = tdesKey,
                    Mode = CipherMode.ECB,
                    Padding = PaddingMode.PKCS7
                };

                // Step 3. Setup the decoder

                // Step 4. Convert the input string to a byte[]
                byte[] dataToDecrypt = Convert.FromBase64String(message);

                // Step 5. Attempt to decrypt the string
                var decryptor = tdesAlgorithm.CreateDecryptor();
                byte[] results = decryptor.TransformFinalBlock(dataToDecrypt, 0, dataToDecrypt.Length);

                // Step 6. Return the decrypted string in UTF8 format
                return utf8.GetString(results);
            }
            catch (Exception ex)
            {
                CommonFunctions.LogDetails(ex, null);
            }
            finally
            {
                // Clear the TripleDes and Hashprovider services of any sensitive information
                if (tdesAlgorithm != null) tdesAlgorithm.Clear();
                if (hashProvider != null) hashProvider.Clear();
            }

            return string.Empty;
        }

        public static void LogDetails(Exception ex, string message)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(ConfigurationManager.AppSettings["LogFilePath"]))
                {
                    return;
                }

                var directoryPath = ConfigurationManager.AppSettings["LogFilePath"];
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                using (var streamWriter = File.AppendText(Path.Combine(directoryPath, DateTime.Today.ToString("MM_dd_yyyy")) + ".lg.edugen"))
                {
                    var logEntry = "Timestamp: " + Environment.NewLine + DateTime.Now
                                   + Environment.NewLine + Environment.NewLine
                                   + "Message: " + Environment.NewLine + (ex != null ? ex.ToString() : (!string.IsNullOrWhiteSpace(message) ? message : "No Message"))
                                   + Environment.NewLine + Environment.NewLine
                                   + "Requested physical path: " + Environment.NewLine +
                                   HttpContext.Current.Request.PhysicalPath
                                   + Environment.NewLine + Environment.NewLine
                                   + "Current URL: " + Environment.NewLine + HttpContext.Current.Request.Url
                                   + Environment.NewLine + Environment.NewLine
                                   + "____________________________________________________________"
                                   + Environment.NewLine;

                    streamWriter.WriteLine(logEntry);
                }
            }
            catch (Exception)
            {
                // Intentionally left blank!
            }
        }
    }
}