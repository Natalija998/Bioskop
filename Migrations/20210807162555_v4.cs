using Microsoft.EntityFrameworkCore.Migrations;

namespace Bioskop.Migrations
{
    public partial class v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sala_Bisokop_BioskopID",
                table: "Sala");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bisokop",
                table: "Bisokop");

            migrationBuilder.RenameTable(
                name: "Bisokop",
                newName: "Bioskop");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bioskop",
                table: "Bioskop",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Sala_Bioskop_BioskopID",
                table: "Sala",
                column: "BioskopID",
                principalTable: "Bioskop",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sala_Bioskop_BioskopID",
                table: "Sala");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bioskop",
                table: "Bioskop");

            migrationBuilder.RenameTable(
                name: "Bioskop",
                newName: "Bisokop");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bisokop",
                table: "Bisokop",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Sala_Bisokop_BioskopID",
                table: "Sala",
                column: "BioskopID",
                principalTable: "Bisokop",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
