package fhy;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * Servlet implementation class TestRecordFlashServlet
 */
public class TestRecordFlashServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uploadFileName = request.getParameter("uploadFileName");
		// ��������
		String filename = UUID.randomUUID().toString().replace("-", "") + uploadFileName;

		DiskFileItemFactory diskFactory = new DiskFileItemFactory();
		// threshold ���ޡ��ٽ�ֵ����Ӳ�̻��� 1M
		diskFactory.setSizeThreshold(4 * 1024);
		// repository �����ң�����ʱ�ļ�Ŀ¼
		diskFactory.setRepository(new File("d:/temp"));

		ServletFileUpload upload = new ServletFileUpload(diskFactory);
		// ���������ϴ�������ļ���С 4M
		upload.setSizeMax(4 * 1024 * 1024);
		// ����HTTP������Ϣͷ
		try {
			List fileItems = upload.parseRequest(request);
			Iterator iter = fileItems.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (item.isFormField()) {
					System.out.println("��������� ...");
				} else {
					System.out.println("�����ϴ����ļ� ...");
					System.out.println("�������ļ�����" + filename);
					long fileSize = item.getSize();

					if ("".equals(filename) && fileSize == 0) {
						System.out.println("�ļ���Ϊ�� ...");
						return;
					}

					File uploadFile = new File("D:/deploy/apache-tomcat-6.0.39/wtpwebapps/speechInput/flashdemo/FlashRecord.mp3");
					if (!uploadFile.exists()) {
						uploadFile.createNewFile();
					}

//					AudioInputStream ain = AudioSystem.getAudioInputStream(item.getInputStream());
//					AudioFormat format = ain.getFormat();
//					AudioSystem.write(ain, AudioFileFormat.Type.WAVE, new File("out2.wav"));
					item.write(uploadFile);
				}
			}// end while()
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
