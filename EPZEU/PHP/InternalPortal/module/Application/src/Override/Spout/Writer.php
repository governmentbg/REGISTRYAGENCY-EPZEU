<?php
namespace Application\Override\Spout;

use Box\Spout\Writer\XLSX\Writer as WriterOrigin;
use Application\Override\Spout\Internal\Workbook;
use Application\Override\Spout\Internal\Worksheet;

/**
 * Class Writer
 * This class provides base support to write data to XLSX files
 *
 * @package Box\Spout\Writer\XLSX
 */
class Writer extends WriterOrigin
{
	/**
	 * Configures the write and sets the current sheet pointer to a new sheet.
	 *
	 * @return void
	 * @throws \Box\Spout\Common\Exception\IOException If unable to open the file for writing
	 */
	public function openWriter()
	{
		if (!$this->book) {
			$tempFolder = ($this->tempFolder) ? : sys_get_temp_dir();
			$this->book = new Workbook($tempFolder, $this->shouldUseInlineStrings, $this->shouldCreateNewSheetsAutomatically, $this->defaultRowStyle);
			$this->book->addNewSheetAndMakeItCurrent();
		}
	}


	/**
	 * Добавя широчина на колоните
	 *
	 * @param unknown $params
	 * @return boolean
	 */
	public static function setSheetParams($params) {

		$stringParams = '';
		$i=1;

		if (isset($params['cols'])) {
			$stringParams .= '<cols>';

			foreach ($params['cols'] as $rowWidth)
				$stringParams .= '<col min="'.$i.'" max="'.$i++.'" width="'.$rowWidth.'" customWidth="1"/>';

				$stringParams .= '</cols>';
		}

		Worksheet::$params = $stringParams;

		return true;
	}


}
