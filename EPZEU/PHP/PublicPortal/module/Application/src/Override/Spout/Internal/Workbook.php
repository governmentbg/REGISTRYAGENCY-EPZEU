<?php

namespace Application\Override\Spout\Internal;

use Box\Spout\Writer\XLSX\Internal\Workbook as OriginalWorkbook;
use Application\Override\Spout\Internal\Worksheet;
use Box\Spout\Writer\Common\Sheet;

/**
 * Class Workbook
 * Represents a workbook within a XLSX file.
 * It provides the functions to work with worksheets.
 *
 * @package Box\Spout\Writer\XLSX\Internal
 */
class Workbook extends OriginalWorkbook
{
	/**
	 * Creates a new sheet in the workbook. The current sheet remains unchanged.
	 *
	 * @return Worksheet The created sheet
	 * @throws \Box\Spout\Common\Exception\IOException If unable to open the sheet for writing
	 */
	public function addNewSheet()
	{
		$newSheetIndex = count($this->worksheets);
		$sheet = new Sheet($newSheetIndex, $this->internalId);

		$worksheetFilesFolder = $this->fileSystemHelper->getXlWorksheetsFolder();
		$worksheet = new Worksheet($sheet, $worksheetFilesFolder, $this->sharedStringsHelper, $this->styleHelper, $this->shouldUseInlineStrings);
		$this->worksheets[] = $worksheet;

		return $worksheet;
	}
}
