package bg.registryagency.epzeu.pr.application.util;

import java.io.*;
import java.net.URLConnection;
import java.nio.file.Files;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class FileUtils {
    public static String getFileExtensionFromFileName(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.') + 1);
    }

    public static String getContentTypeFromFileName(String fileName) {
//        MimetypesFileTypeMap.getDefaultFileTypeMap().getContentType(testPdfFile);
        return URLConnection.guessContentTypeFromName(fileName);
    }

    public static byte[] getHashFromFile(File file, String hashAlgorithm) throws NoSuchAlgorithmException, IOException {
        byte[] bytes = Files.readAllBytes(file.toPath());

        MessageDigest digest = MessageDigest.getInstance(hashAlgorithm);

        digest.update(bytes);

        return digest.digest();
    }

    public static byte[] getHashFromBytes(byte[] fileBytes, String hashAlgorithm) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance(hashAlgorithm);

        digest.update(fileBytes);

        return digest.digest();
    }

    public static byte[] getHashFromInputStream(InputStream inputStream, String hashAlgorithm) throws NoSuchAlgorithmException, IOException {
        byte[] buffer = new byte[1024];
        MessageDigest complete = MessageDigest.getInstance(hashAlgorithm);
        int numRead;

        do {
            numRead = inputStream.read(buffer);
            if (numRead > 0) {
                complete.update(buffer, 0, numRead);
            }
        } while (numRead != -1);

        inputStream.close();

        return complete.digest();
    }

    public static void printBytes(byte[] bytes) {
        StringBuilder stringBuilder = new StringBuilder();
        for (byte aByte : bytes) {
            stringBuilder.append(aByte);
        }
        System.out.println(stringBuilder.toString());
    }

    public static void saveFile(byte[] documentSignedBytes, String pathToTargetFile)
        throws IOException {
        // Output the resulting document.
        try (OutputStream outputStream = new FileOutputStream(pathToTargetFile)){
            outputStream.write(documentSignedBytes);
        }
    }
}
