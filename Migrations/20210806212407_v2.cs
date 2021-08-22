using Microsoft.EntityFrameworkCore.Migrations;

namespace Bioskop.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala");

            migrationBuilder.AlterColumn<int>(
                name: "SalaID",
                table: "FilmSala",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala",
                column: "SalaID",
                principalTable: "Sala",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala");

            migrationBuilder.AlterColumn<int>(
                name: "SalaID",
                table: "FilmSala",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala",
                column: "SalaID",
                principalTable: "Sala",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
